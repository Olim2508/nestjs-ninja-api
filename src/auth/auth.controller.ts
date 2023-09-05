import {Body, Controller, Post, UseGuards, UsePipes, ValidationPipe} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import {AuthService} from "./auth.service";
import {RegisterUserDto} from "../users/dto/create-user.dto";
import {SignInDto} from "./dto/sign-in.dto";
import {Public} from "./decorators/public.decorator";
import {LocalAuthGuard} from "./guards/local-auth.guard";
import {JwtRefreshTokenGuard} from "./guards/jwt-refresh-token.guard";
import {RefreshTokenDto} from "./dto/refresh-token.dto";

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly usersService: UsersService,
    ) {
    }

    @Post('sign-up')
    @UsePipes(new ValidationPipe())
    @UseGuards(LocalAuthGuard)
    async signUp(@Body() registerUserDto: RegisterUserDto) {
        const user = await this.usersService.create(registerUserDto);
        const {password, ...responseUser} = user;
        return responseUser;
    }

    @Public()
    @Post('sign-in')
    @UsePipes(new ValidationPipe())
    async signIn(@Body() signInDto: SignInDto) {
        return this.authService.signIn(signInDto);
    }

    @UseGuards(JwtRefreshTokenGuard)
    @Post('refresh-token')
    async refreshToken(@Body() refreshTokenDto: RefreshTokenDto) {
        return this.authService.refreshAccessToken(refreshTokenDto.refresh_token);
    }
}
