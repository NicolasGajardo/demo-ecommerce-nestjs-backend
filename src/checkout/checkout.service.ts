import {
  BadRequestException,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CheckoutBody } from './dto/checkout.body';
import { TransactionBody } from 'src/transactions/dto/transaction.body';

@Injectable({ scope: Scope.DEFAULT })
export class CheckoutService {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly productsService: ProductsService,
  ) {}

  checkout(body: CheckoutBody): Observable<any> {
    const { products: checkoutProducts } = body;

    const uniqueProducts = new Set(checkoutProducts.map((p) => p.id));

    if (uniqueProducts.size !== checkoutProducts.length) {
      throw new BadRequestException(`Duplicated products`);
    }

    const productsList: Observable<{
      product_id: string;
      quantity: number;
    }>[] = [];

    const trx = new TransactionBody();
    trx.price = 0;

    for (const checkoutProduct of checkoutProducts) {
      const obs$ = this.productsService.findById(checkoutProduct.id).pipe(
        switchMap((product) => {
          const newStock = product.stock - checkoutProduct.quantity;

          if (newStock < 0) {
            throw new UnprocessableEntityException(
              `The product [${product.id}] is out of stock`,
            );
          }

          return this.productsService
            .update(product.id, { stock: newStock })
            .pipe(
              switchMap(() => {
                trx.price += checkoutProduct.quantity * product.price;
                return of({
                  product_id: product.id,
                  quantity: checkoutProduct.quantity,
                });
              }),
            );
        }),
      );

      productsList.push(obs$);
    }

    return forkJoin(productsList).pipe(
      switchMap((products) => {
        return this.transactionService.save({
          price: trx.price,
          products: products,
        });
      }),
    );
  }
}
