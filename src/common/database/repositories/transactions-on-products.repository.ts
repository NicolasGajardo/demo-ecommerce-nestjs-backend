import { Injectable, Scope } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import {
  TransactionsOnProducts as TransactionsOnProductsModel,
  Prisma,
} from '@prisma/client';
import { AssingTypeToReturnType } from 'src/common/utils/types';
import { TransactionsOnProductsObservableAdapter } from '../extensions/transactions-on-products-observable-adapter';
import { PrismaService } from '../prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class TransactionsOnProductsRepository {
  constructor(private prisma: PrismaService) {}

  public get native(): Prisma.TransactionsOnProductsDelegate {
    return this.prisma.transactionsOnProducts;
  }

  public get obsAdapter(): TransactionsOnProductsObservableAdapter {
    return this.prisma.transactionsOnProductsObsAdapter;
  }

  findAndCount$(
    searchColumns: Partial<TransactionsOnProductsModel>,
    searchOptions?: {
      sortBy: AssingTypeToReturnType<
        Partial<TransactionsOnProductsModel>,
        Prisma.SortOrder
      >;
      skip: number;
      take: number;
    },
  ): Observable<{ data: TransactionsOnProductsModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<TransactionsOnProductsModel[]> =
      this.prisma.transactionsOnProductsObsAdapter.findMany$({
        skip,
        take,
        where,
        orderBy: sortBy,
      });

    const total$: Observable<number> =
      this.prisma.transactionsOnProductsObsAdapter.count$({
        where,
      });

    return forkJoin({ data: data$, count: total$ });
  }
}
