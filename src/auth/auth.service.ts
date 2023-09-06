import {Injectable, Logger, UnauthorizedException} from '@nestjs/common';
import {JwtService} from '@nestjs/jwt';
import {UsersService} from '../users/users.service';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {User} from "../users/entities/user.entity";
import {SignInDto} from "./dto/sign-in.dto";
import {IUser} from "./interface/auth.service.interface";
import {RefreshTokenIdsStorage} from "./utils/refresh-token-ids-storage";
import {JwtRefreshTokenStrategy} from "./strategy/jwt-refresh-token.strategy";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        private readonly jwtService: JwtService,
        private readonly usersService: UsersService,
        private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
        // private readonly configService: ConfigService,
    ) {
    }

    async signIn(signInDto: SignInDto) {
        const user = await this.validateUser(
            signInDto.username,
            signInDto.password,
        );
        if (!user) {
            throw new UnauthorizedException('Invalid username or password');
        }

        const payload = {sub: user.id, username: user.username};
        // const accessToken = await this.jwtService.signAsync(payload);
        // todo need to configure secret key inside Jwt Service injection in auth.module
        const accessToken = await this.jwtService.signAsync(payload, {secret: process.env.JWT_SECRET})
        const refreshToken = await this.jwtService.signAsync(payload, {
            expiresIn: '1d',
            secret: process.env.JWT_SECRET
        });

        // Store the refresh token in redis
        // todo need to create redis server to store refresh token
        await this.refreshTokenIdsStorage.insert(user.id, refreshToken);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    async validateUser(username: string, password: string): Promise<IUser | null> {
        const user = await this.usersService.findByUsername(username);
        if (user && (await user.validatePassword(password))) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    async refreshAccessToken(
        refreshToken: string,
    ): Promise<{ access_token: string }> {
        try {
            const decoded = await this.jwtService.verifyAsync(refreshToken);
            await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
            const payload = {sub: decoded.sub, username: decoded.username};
            const accessToken = await this.jwtService.signAsync(payload);
            return {access_token: accessToken};
        } catch (error) {
            this.logger.error(`Error: ${error.message}`);
            throw new UnauthorizedException('Invalid refresh token');
        }
    }

    // async invalidateToken(accessToken: string): Promise<void> {
    //   try {
    //     const decoded = await this.jwtService.verifyAsync(accessToken);
    //     await this.refreshTokenIdsStorage.invalidate(decoded.sub);
    //   } catch (error) {
    //     throw new UnauthorizedException('Invalid access token');
    //   }
    // }
}