import {
  BadRequestException,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, forkJoin, from, of, switchMap } from 'rxjs';
import { ProductsService } from 'src/products/products.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CheckoutBody } from './dto/checkout.body';
import { TransactionBody } from 'src/transactions/dto/transaction.body';
import { TransactionProductService } from 'src/transaction-product/transaction-product.service';
import { ProductModel } from 'src/common/database/models/product.model';

@Injectable({ scope: Scope.DEFAULT })
export class CheckoutService {
  constructor(
    private readonly transactionService: TransactionsService,
    private readonly productsService: ProductsService,
    private readonly transactionProductService: TransactionProductService,
  ) {}

  checkout(body: CheckoutBody): Observable<any> {
    const { products: checkoutProducts } = body;

    const uniqueProducts = new Set(checkoutProducts.map((p) => p.uuid));

    if (uniqueProducts.size !== checkoutProducts.length) {
      throw new BadRequestException(`Duplicated products`);
    }

    const obsList: Observable<{
      product_id: string;
      quantity: number;
    }>[] = [];

    const trx = new TransactionBody();
    trx.price = 0;

    for (const checkoutProduct of checkoutProducts) {
      const obs$ = this.productsService.findById(checkoutProduct.uuid).pipe(
        switchMap((product) => {
          const newStock = product.stock - checkoutProduct.quantity;

          if (newStock < 0) {
            throw new UnprocessableEntityException(
              `The product [${product.uuid}] is out of stock`,
            );
          }

          return this.productsService
            .update(product.uuid, {
              stock: newStock,
            })
            .pipe(
              switchMap(() => {
                trx.price += checkoutProduct.quantity * product.price;
                return of({
                  product_id: product.uuid,
                  quantity: checkoutProduct.quantity,
                });
              }),
            );
        }),
      );

      obsList.push(obs$);
    }

    return forkJoin(obsList).pipe(
      switchMap((trxs) => {
        return this.transactionService.save(trx).pipe(
          switchMap((transaction) =>
            from(trxs).pipe(
              switchMap((trx) => {
                return this.transactionProductService.save({
                  quantity: trx.quantity,
                  transaction: transaction,
                  product: { uuid: trx.product_id } as ProductModel,
                });
              }),
            ),
          ),
        );
      }),
    );
  }
}
