import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Put,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthBody } from './dto/auth.body';
import { AuthGuard } from 'src/common/middlewares/auth.guard';
import { UpdatePasswordAuthBody } from './dto/update-password-auth.body';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  async register(@Body() body: AuthBody) {
    await this.authService.register(body.email, body.password);
  }

  @Post('login')
  async login(@Body() body: AuthBody) {
    return await this.authService.login(body);
  }

  @Put('update-password')
  @UseGuards(AuthGuard)
  async updatePassword(
    @Body() body: UpdatePasswordAuthBody,
    @Request() req: any,
  ) {
    await this.authService.updatePassword(
      req.user.email,
      body.oldPassword,
      body.newPassword,
    );
  }
}
