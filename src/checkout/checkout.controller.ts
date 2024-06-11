import { Body, Controller, Post, Res, Scope, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { CheckoutService } from './checkout.service';
import { CheckoutBody } from './dto/checkout.body';
import { map } from 'rxjs';
import { HttpStatusCode } from 'axios';
import { Response } from 'express';

@Controller({ path: 'checkout', scope: Scope.DEFAULT })
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  checkout(@Body() body: CheckoutBody, @Res() res: Response) {
    return this.checkoutService.checkout(body).pipe(
      map((transaction) => {
        return res
          .location('/transactions/' + transaction.id)
          .status(HttpStatusCode.Created)
          .send();
      }),
    );
  }
}
