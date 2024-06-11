import { Inject, Injectable, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Observable } from 'rxjs';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { TransactionsQueryParams } from './dto/transactions.query-params';
import { TransactionBody } from './dto/transaction.body';
import { Transaction as TransactionModel } from '@prisma/client';
import { TransactionsRepository } from 'src/common/database/repositories/transactions.repository';

@Injectable({ scope: Scope.REQUEST })
export class TransactionsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly transactionsRepository: TransactionsRepository,
  ) {}

  findAll(
    req: TransactionsQueryParams,
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const { limit, page, sortBy = 'desc' } = req;

    const take = Number(limit) || 10;
    const skip = Number(page) * Number(limit) || 0;
    const orderBy = { createdAt: sortBy };
    const where: Partial<TransactionModel> = {
      buyerUserEmail: this.req.user.email,
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
        quantity: number;
        createdAt: Date;
        updatedAt: Date;
        productId: string;
        transactionId: string;
      }[];
    }
  > {
    return this.transactionsRepository.obsAdapter.findUnique$({
      where: { id: id },
      include: { products: true },
    });
  }

  save(transactionBody: Partial<TransactionBody>): Observable<object> {
    const { price } = transactionBody;

    return this.transactionsRepository.obsAdapter.create$({
      data: {
        price: price,
        buyerUserEmail: this.req.user.email,
      },
    });
  }

  delete(id: string): Observable<object> {
    return this.transactionsRepository.obsAdapter.delete$({
      where: {
        id: id,
        buyerUserEmail: this.req.user.email,
      },
    });
  }
}
