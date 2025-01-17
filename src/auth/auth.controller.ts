import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Scope,
  Patch,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './dto/auth.body';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { UpdatePasswordAuthBody } from './dto/update-password-auth.body';
import { Observable } from 'rxjs';
import { AccessToken } from './interface/access-token.interface';
@Controller({ path: 'auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('register')
  register(@Body() body: AuthBody): Observable<void> {
    return this.authService.register(body);
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: AuthBody): Observable<AccessToken> {
    return this.authService.login(body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch('update-password')
  updatePassword(@Body() body: UpdatePasswordAuthBody): Observable<void> {
    return this.authService.updatePassword(body);
  }
  // TODO: Falta darse de baja
}
