import { Controller, Post, Scope, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CheckoutService } from './checkout.service';

@Controller({ path: 'checkout', scope: Scope.DEFAULT })
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  checkout() {
    return this.checkoutService.checkout();
  }
}
