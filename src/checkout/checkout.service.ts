import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, map, merge, mergeMap, switchMap } from 'rxjs';
import { CheckoutBody } from './dto/checkout.body';
import { ProductsRepository } from 'src/common/database/repositories/products.repository';
import { TransactionsRepository } from 'src/common/database/repositories/transactions.repository';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { REQUEST } from '@nestjs/core';
import { mergeArrays } from 'src/common/utils/functions';

@Injectable({ scope: Scope.REQUEST })
export class CheckoutService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  checkout(body: CheckoutBody): Observable<any> {
    const { products: checkoutProducts } = body;

    const uniqueProducts = new Set(checkoutProducts.map((p) => p.id));

    if (uniqueProducts.size !== checkoutProducts.length) {
      throw new BadRequestException(`Duplicated products`);
    }

    const checkoutProductsEntities =
      this.productsRepository.obsAdapter.findMany$({
        where: { id: { in: [...uniqueProducts] } },
      });

    checkoutProductsEntities.pipe(
      map((products) => {
        console.log(products);

        const mergedProducts = mergeArrays(
          products,
          checkoutProducts,
          (v) => v.id,
        );

        let totalPrice = 0;

        for (const product of mergedProducts) {
          const newStock = product.stock - product.quantity;
          if (newStock < 0) {
            throw new UnprocessableEntityException(
              `The product [${product.id}] is out of stock`,
            );
          }

          totalPrice += product.quantity * product.price;
          product.stock = newStock;
        }
        return { mergedProducts, totalPrice };
      }),
      switchMap(({ mergedProducts, totalPrice }) => {
        // products: {
        //   every: [products],
        // },

        return this.productsRepository.obsAdapter.updateMany$({
          price: totalPrice,
          buyerUserEmail: this.req.user.email,
          products: mergedProducts,
        });
      }),
    );

    // // const productsList: Observable<{
    // //   product_id: string;
    // //   quantity: number;
    // // }>[] = [];

    // const trx = new TransactionBody();
    // trx.price = 0;

    // // for (const checkoutProduct of checkoutProducts) {
    // //   const obs$ = this.productsService.findById(checkoutProduct.id).pipe(
    // //     switchMap((product) => {
    //       const newStock = product.stock - checkoutProduct.quantity;

    //       if (newStock < 0) {
    //         throw new UnprocessableEntityException(
    //           `The product [${product.id}] is out of stock`,
    //         );
    //       }

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
