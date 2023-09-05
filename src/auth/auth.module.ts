import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {AuthController} from './auth.controller';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";
import {RefreshTokenIdsStorage} from "./refresh-token-ids-storage";
import {LocalStrategy} from "./strategy/local.strategy";
import {JwtRefreshTokenStrategy} from "./strategy/jwt-refresh-token.strategy";

@Module({
    imports: [
        UsersModule,
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            // secret: process.env.JWT_SECRET || 'secret',
            secret: "miZHxYebLSQxS4S/W8SCzV8zSwR9+uRNZSZlzL04b0k" || 'secret',
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [
        AuthService,
        UsersService,
        JwtService,
        RefreshTokenIdsStorage,
        LocalStrategy,
        JwtRefreshTokenStrategy,
    ],
    controllers: [AuthController]
})
export class AuthModule {
}
