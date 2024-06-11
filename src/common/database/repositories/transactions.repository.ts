import { Injectable, Scope } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';

import { Transaction as TransactionModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AssingTypeToReturnType } from 'src/common/utils/types';
import { TransactionObservableAdapter } from '../extensions/transaction-observable-adapter';

@Injectable({ scope: Scope.DEFAULT })
export class TransactionsRepository {
  constructor(private readonly prisma: PrismaService) {}

  public get native(): Prisma.TransactionDelegate {
    return this.prisma.transaction;
  }

  public get obsAdapter(): TransactionObservableAdapter {
    return this.prisma.transactionObsAdapter;
  }

  findAndCount$(
    searchColumns: Partial<TransactionModel>,
    searchOptions?: {
      sortBy: AssingTypeToReturnType<
        Partial<TransactionModel>,
        Prisma.SortOrder
      >;
      skip: number;
      take: number;
    },
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<TransactionModel[]> =
      this.prisma.transactionObsAdapter.findMany$({
        skip,
        take,
        where,
        orderBy: sortBy,
      });

    const total$: Observable<number> = this.prisma.transactionObsAdapter.count$(
      {
        where,
      },
    );

    return forkJoin({ data: data$, count: total$ });
  }
}
