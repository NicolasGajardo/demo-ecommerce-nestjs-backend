import { Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/common/middlewares/auth.guard';
import { CheckoutService } from './checkout.service';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(AuthGuard)
  checkout() {
    this.checkoutService.checkout();
  }
}
