import { Controller, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/common/middlewares/auth.guard';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  checkout() {
    this.checkoutService.checkout();
  }
}
