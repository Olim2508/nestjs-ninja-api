import {ExecutionContext, Injectable, Logger} from '@nestjs/common';
import {AuthGuard} from '@nestjs/passport';

@Injectable()
export class JwtRefreshTokenGuard extends AuthGuard('jwt-refresh-token') {
    private readonly logger = new Logger(JwtRefreshTokenGuard.name);

    canActivate(context: ExecutionContext) {
        return super.canActivate(context);
    }
}

// need to implement simple private api and set up jwtGuard to him to check by access token provided
