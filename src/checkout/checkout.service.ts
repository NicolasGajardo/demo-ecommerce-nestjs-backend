import { BadRequestException, Injectable, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { CheckoutBody } from './dto/checkout.body';
import { ProductsRepository } from 'src/common/database/repositories/products.repository';
import { TransactionsRepository } from 'src/common/database/repositories/transactions.repository';

@Injectable({ scope: Scope.DEFAULT })
export class CheckoutService {
  constructor(
    private readonly transactionsRepository: TransactionsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  checkout(body: CheckoutBody): Observable<any> {
    const { products: checkoutProducts } = body;

    const uniqueProducts = new Set(checkoutProducts.map((p) => p.id));

    if (uniqueProducts.size !== checkoutProducts.length) {
      throw new BadRequestException(`Duplicated products`);
    }

    return null;
    // const checkoutProductsEntity = this.productsRepository.obsAdapter.findMany$({
    //   where: { id: { in: [...uniqueProducts] } },
    // });

    // // const productsList: Observable<{
    // //   product_id: string;
    // //   quantity: number;
    // // }>[] = [];

    // const trx = new TransactionBody();
    // trx.price = 0;

    // // for (const checkoutProduct of checkoutProducts) {
    // //   const obs$ = this.productsService.findById(checkoutProduct.id).pipe(
    // //     switchMap((product) => {
    // //       const newStock = product.stock - checkoutProduct.quantity;

    // //       if (newStock < 0) {
    // //         throw new UnprocessableEntityException(
    // //           `The product [${product.id}] is out of stock`,
    // //         );
    // //       }

    // //       return this.productsService
    // //         .update(product.id, { stock: newStock })
    // //         .pipe(
    // //           switchMap(() => {
    // //             trx.price += checkoutProduct.quantity * product.price;
    // //             return of({
    // //               product_id: product.id,
    // //               quantity: checkoutProduct.quantity,
    // //             });
    // //           }),
    // //         );
    // //     }),
    // //   );

    // //   productsList.push(obs$);
    // // }

    // // return forkJoin(productsList).pipe(
    // //   switchMap((products) => {
    // //     return this.transactionService.save({
    // //       price: trx.price,
    // //       products: products,
    // //     });
    // //   }),
    // // );
  }
}
