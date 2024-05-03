import { BadRequestException, Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Observable, map } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { ProductsService } from 'src/products/products.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CheckoutBody } from './dto/checkout.body';

@Injectable({ scope: Scope.DEFAULT })
export class CheckoutService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly transactionService: TransactionsService,
    private readonly productsService: ProductsService,
  ) {}

  checkout(body: CheckoutBody): Observable<any> {
    this.req.user.email; // Comprobar si el usuario no se pisa con otro
    const { products } = body;

    const uniqueProducts = new Set(products.map((p) => p.uuid));

    if (uniqueProducts.size !== products.length) {
      throw new BadRequestException('Duplicated products');
    }

    for (const product of products) {
      this.productsService.findById(product.uuid).pipe(
        map((product) =>
          this.productsService.update(product.uuid, {
            stock: product.quantiy,
          }),
        ),
      );
    }

    return null;
  }
}
