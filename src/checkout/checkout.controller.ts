import { Body, Controller, Post, Scope, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CheckoutService } from './checkout.service';
import { CheckoutBody } from './dto/checkout.body';

@Controller({ path: 'checkout', scope: Scope.DEFAULT })
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  checkout(@Body() body: CheckoutBody) {
    return this.checkoutService.checkout(body);
  }
}
