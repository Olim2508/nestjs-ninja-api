import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TokenExpiredError } from 'jsonwebtoken';
import {User} from "../users/entities/user.entity";
import {SignInDto} from "./dto/sign-in.dto";

@Injectable()
export class AuthService {
  // private readonly logger = new Logger(JwtRefreshTokenStrategy.name);

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
    // private readonly configService: ConfigService,
    // private readonly refreshTokenIdsStorage: RefreshTokenIdsStorage,
  ) {}
  async signIn(signInDto: SignInDto) {
    const { username, password } = signInDto;

    const user = await this.usersService.findByUsername(username);

    if (!user) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const passwordIsValid = await user.validatePassword(password);

    if (!passwordIsValid) {
      throw new UnauthorizedException('Invalid username or password');
    }

    const payload = { sub: user.id, username: user.username };
    const accessToken = await this.jwtService.signAsync(payload, {secret:process.env.JWT_SECRET});

    return { access_token: accessToken };
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (user && (await user.validatePassword(password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  // async refreshAccessToken(
  //   refreshToken: string,
  // ): Promise<{ access_token: string }> {
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(refreshToken);
  //     await this.refreshTokenIdsStorage.validate(decoded.sub, refreshToken);
  //     const payload = { sub: decoded.sub, username: decoded.username };
  //     const accessToken = await this.jwtService.signAsync(payload);
  //     return { access_token: accessToken };
  //   } catch (error) {
  //     this.logger.error(`Error: ${error.message}`);
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  // async invalidateToken(accessToken: string): Promise<void> {
  //   try {
  //     const decoded = await this.jwtService.verifyAsync(accessToken);
  //     await this.refreshTokenIdsStorage.invalidate(decoded.sub);
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid access token');
  //   }
  // }
}