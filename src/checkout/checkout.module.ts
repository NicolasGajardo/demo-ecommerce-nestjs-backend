import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [DatabaseModule, AuthModule],
})
export class CheckoutModule {}
