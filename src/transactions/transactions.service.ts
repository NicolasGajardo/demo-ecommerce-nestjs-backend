import {
  Inject,
  Injectable,
  Logger,
  NotImplementedException,
  Scope,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Observable, forkJoin, from, map, switchMap, tap } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionBody } from './dto/transaction.body';
import { PrismaService } from 'src/common/database/prisma.service';
import { Prisma, Transaction as TransactionModel } from '@prisma/client';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  findAll(
    req: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const { limit, page, sortBy = 'desc' } = req;

    const take = Number(limit) || 10;
    const skip = Number(page) * Number(limit) || 0;
    const orderBy = { createdAt: sortBy };

    const data$: Observable<any> = from(
      this.prisma.transaction.findMany({
        skip,
        take,
        orderBy,
      }),
    );

    const total$: Observable<any> = from(this.prisma.transaction.count({}));

    return forkJoin({ data$, total$ }).pipe(tap(Logger.debug));
  }

  findById(id: string): Observable<TransactionModel> {
    return from(
      this.prisma.transaction.findUnique({
        where: { id: id },
      }),
    ).pipe(tap(Logger.debug));
  }

  save(transactionBody: Partial<TransactionBody>) {
    // const { price } = transactionBody;
    throw new NotImplementedException();
    // return from(
    //   this.prisma.transaction.create({
    //     data: {
    //       price: price,
    //       buyerUserEmail: this.req.user.email,
    //       user: { connect: { email: this.req.user.email } },
    //     } as Prisma.TransactionCreateInput,
    //   }),
    // ).pipe(
    //   map((trx) =>
    //     transactionBody.products.map((products) => ({
    //       productId: products.product_id,
    //       quantity: products.quantity,
    //       transactionId: trx.id,
    //     })),
    //   ),
    //   switchMap((trxsOnProducts) =>
    //     this.prisma.transactionsOnProducts.createMany({ data: trxsOnProducts }),
    //   ),
    // );
  }

  delete(id: string) {
    return from(
      this.prisma.transaction.delete({
        where: {
          id: id,
          buyerUserEmail: this.req.user.email,
        },
      }),
    );
  }
}
