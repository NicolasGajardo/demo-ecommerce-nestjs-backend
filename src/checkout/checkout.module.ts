import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { JwtModule } from '@nestjs/jwt';
import { DatabaseModule } from 'src/common/database/database.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [DatabaseModule, JwtModule],
})
export class CheckoutModule {}
