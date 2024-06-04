import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import {
  Deletable,
  Findable,
  Savable,
  Updatable,
} from './repository-interfaces';
import { Transaction as TransactionModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AssingObjectTypeToProps, XOR } from 'src/common/utils/types';
import { TransactionObservableAdapter } from '../extensions/transaction-observable-adapter';

@Injectable()
export class TransactionsRepository
  implements
    Findable<TransactionModel>,
    Savable<TransactionModel>,
    Updatable<TransactionModel>,
    Deletable
{
  constructor(private readonly prisma: PrismaService) {}

  public get native(): Prisma.TransactionDelegate {
    return this.prisma.transaction;
  }

  public get observableAdapter(): TransactionObservableAdapter {
    return this.prisma.transactionObsAdapter;
  }

  findAndCount(
    searchColumns: Partial<TransactionModel>,
    searchOptions?: {
      sortBy: AssingObjectTypeToProps<TransactionModel, Prisma.SortOrder>;
      skip: number;
      take: number;
    },
  ): Observable<{ data: TransactionModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<any> = this.prisma.transactionObsAdapter.findMany$({
      skip,
      take,
      where,
      orderBy: sortBy,
    });

    const total$: Observable<any> = this.prisma.transactionObsAdapter.count$({
      where,
    });

    return forkJoin({ data: data$, count: total$ });
  }

  findById(id: string): Observable<TransactionModel> {
    return this.prisma.transactionObsAdapter.findUnique$({
      where: { id: id },
    });
  }

  save(
    payload: XOR<
      Prisma.TransactionCreateInput,
      Prisma.TransactionUncheckedCreateInput
    >,
  ): Observable<Pick<TransactionModel, 'id'>> {
    return this.prisma.transactionObsAdapter.create$({
      data: payload,
      select: { id: true },
    });
  }

  updateById(id: string, payload: Partial<TransactionModel>): Observable<null> {
    return this.prisma.transactionObsAdapter
      .update$({
        data: payload,
        where: { id: id },
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  updateBy(
    where: Prisma.TransactionWhereUniqueInput,
    payload: Partial<TransactionModel>,
  ): Observable<null> {
    return this.prisma.transactionObsAdapter
      .update$({
        data: payload,
        where: where,
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  deleteById(id: string): Observable<void> {
    return this.prisma.transactionObsAdapter
      .delete$({
        where: { id: id },
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  deleteBy(where: Prisma.TransactionWhereUniqueInput): Observable<void> {
    return this.prisma.transactionObsAdapter
      .delete$({
        where: where,
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }
}
