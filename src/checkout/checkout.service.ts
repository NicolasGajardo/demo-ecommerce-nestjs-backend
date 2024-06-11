import {
  BadRequestException,
  Inject,
  Injectable,
  Logger,
  Scope,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable, catchError, forkJoin, map, switchMap } from 'rxjs';
import { CheckoutBody } from './dto/checkout.body';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { REQUEST } from '@nestjs/core';
import { PrismaService } from 'src/common/database/prisma.service';

type Checkout = {
  productId: string;
  buyedQuantity: number;
};

@Injectable({ scope: Scope.REQUEST })
export class CheckoutService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly prisma: PrismaService,
  ) {}

  checkout(body: CheckoutBody): Observable<
    {
      products: {
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        transactionId: string;
      }[];
    } & {
      id: string;
      price: number;
      createdAt: Date;
      updatedAt: Date;
      buyerUserEmail: string;
    }
  > {
    const { products: checkoutProducts } = body;

    const uniqueProducts = new Set(checkoutProducts.map((p) => p.id));

    if (uniqueProducts.size !== checkoutProducts.length) {
      throw new BadRequestException(`Duplicated products`);
    }

    const productsToProcess: Observable<Checkout>[] = [];
    let finalPrice: number = 0;

    for (const checkoutProduct of checkoutProducts) {
      productsToProcess.push(
        this.prisma.productObsAdapter
          .findUniqueOrThrow$({
            where: {
              id: checkoutProduct.id,
              AND: {
                stock: { gte: checkoutProduct.quantity },
              },
            },
            select: { id: true, stock: true, price: true },
          })
          .pipe(
            catchError((err) => {
              Logger.error(err, 'checkout');

              throw new UnprocessableEntityException(
                `The product ${checkoutProduct.id} doesn't exists or is out of stock`,
              );
            }),
            map((product) => {
              finalPrice += product.price * checkoutProduct.quantity;
              product.stock -= checkoutProduct.quantity;
              return {
                productId: checkoutProduct.id,
                buyedQuantity: checkoutProduct.quantity,
              };
            }),
          ),
      );
    }

    return forkJoin(productsToProcess).pipe(
      switchMap((products) => {
        return this.prisma.transactionObsAdapter
          .create$({
            data: {
              price: 0,
              buyerUserEmail: this.req.user.email,
            },
          })
          .pipe(
            switchMap((trx) => {
              return this.prisma.transactionObsAdapter.update$({
                data: {
                  price: finalPrice,
                  products: {
                    connect: products.map((p) => ({
                      quantity: p.buyedQuantity,
                      transactionId_productId: {
                        transactionId: trx.id,
                        productId: p.productId,
                      },
                    })),
                  },
                },
                where: { id: trx.id },
                include: { products: true },
              });
            }),
          );
      }),
    );
  }
}
