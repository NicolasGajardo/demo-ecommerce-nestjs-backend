import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  Scope,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './dto/auth.body';
import { JwtAuthGuard } from 'src/common/middlewares/auth.guard';
import { UpdatePasswordAuthBody } from './dto/update-password-auth.body';
@Controller({ path: 'auth', scope: Scope.REQUEST })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  register(@Body() body: AuthBody) {
    return this.authService.register(body);
  }

  @Post('login')
  login(@Body() body: AuthBody) {
    return this.authService.login(body);
  }

  @Put('update-password')
  @UseGuards(JwtAuthGuard)
  updatePassword(@Body() body: UpdatePasswordAuthBody) {
    return this.authService.updatePassword(body);
  }
}
