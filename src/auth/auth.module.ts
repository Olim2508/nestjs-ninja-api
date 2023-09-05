import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import {UsersService} from "../users/users.service";
import {UsersModule} from "../users/users.module";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret',
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, UsersService, JwtService],
  controllers: [AuthController]
})
export class AuthModule {}
