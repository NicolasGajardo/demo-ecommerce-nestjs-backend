import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [
    DatabaseModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: function (config: ConfigService) {
        return {
          global: true,
          secret: config.get<string>('APP_JWT_SECRET'),
          signOptions: {
            expiresIn: config.get<string>('APP_JWT_EXPIRATION_TIME'),
          },
        };
      },
    }),
  ],
})
export class AuthModule {}
