import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from '../utils/functions';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const { email } = await this.jwtService.verifyAsync(token, {
        secret: process.env.APP_JWT_SECRET,
      });
      request['user'] = { email: email };
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }
}
