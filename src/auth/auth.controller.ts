import {
  Controller,
  Post,
  Body,
  UnauthorizedException,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.NO_CONTENT)
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    // TODO: manejar las excepciones, mapearlas a errores HTTP
    // En este caso sería HTTP404
    await this.authService.register(registerDto.email, registerDto.password);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const isAuth = await this.authService.login(
      loginDto.email,
      loginDto.password,
    );

    if (!isAuth) {
      throw new UnauthorizedException();
    }

    const payload = { email: loginDto.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
