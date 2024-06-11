import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionBody } from './dto/transaction.body';
import { Transaction as TransactionModel } from '@prisma/client';
import { TransactionsRepository } from 'src/common/database/repositories/transactions.repository';
import { PrismaService } from 'src/common/database/prisma.service';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly transactionsRepository: TransactionsRepository,
    private readonly prisma: PrismaService,
  ) {}

  findAll(
    req: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const { limit, page, sortBy = 'desc' } = req;

    const take = Number(limit) || 10;
    const skip = Number(page) * Number(limit) || 0;
    const orderBy = { createdAt: sortBy };
    const where: Partial<TransactionModel> = {
      buyerUserId: this.req.user.id,
    };

    return this.transactionsRepository.findAndCount$(where, {
      skip,
      sortBy: orderBy,
      take,
    });
  }

  findById(id: string): Observable<
    TransactionModel & {
      products: {
        productQuantity: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        transactionId: string;
      }[];
    }
  > {
    return this.prisma.transactionObsAdapter.findUnique$({
      where: { id: id },
      include: { products: true },
    });
  }

  save(transactionBody: Partial<TransactionBody>): Observable<object> {
    const { price } = transactionBody;

    return this.prisma.transactionObsAdapter.create$({
      data: {
        price: price,
        buyerUserId: this.req.user.id,
      },
    });
  }

  delete(id: string): Observable<object> {
    return this.prisma.transactionObsAdapter.delete$({
      where: {
        id: id,
        buyerUserId: this.req.user.id,
      },
    });
  }
}
