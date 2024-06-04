import { Prisma } from '@prisma/client';
import {
  DefaultArgs,
  GetFindResult,
  Record,
} from '@prisma/client/runtime/library';
import { Observable, from } from 'rxjs';
import { AddSufix, FilterAndOmit } from 'src/common/utils/types';

export class TransactionObservableAdapter
  implements
    AddSufix<
      FilterAndOmit<Prisma.TransactionDelegate, () => any, 'groupBy'>,
      '$'
    >
{
  constructor(private readonly transaction: Prisma.TransactionDelegate) {}

  findUnique$<T extends Prisma.TransactionFindUniqueArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionFindUniqueArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.findUnique(args));
  }

  findUniqueOrThrow$<
    T extends Prisma.TransactionFindUniqueOrThrowArgs<DefaultArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionFindUniqueOrThrowArgs<DefaultArgs>
    >,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.TransactionFindFirstArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionFindFirstArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.findFirst(args));
  }

  findFirstOrThrow$<
    T extends Prisma.TransactionFindFirstOrThrowArgs<DefaultArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionFindFirstOrThrowArgs<DefaultArgs>
    >,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.TransactionFindManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>[]> {
    return from(this.transaction.findMany(args));
  }

  create$<T extends Prisma.TransactionCreateArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionCreateArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.create(args));
  }

  createMany$<T extends Prisma.TransactionCreateManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionCreateManyArgs<DefaultArgs>
    >,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.createMany(args));
  }

  delete$<T extends Prisma.TransactionDeleteArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionDeleteArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.delete(args));
  }

  update$<T extends Prisma.TransactionUpdateArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpdateArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.update(args));
  }

  deleteMany$<T extends Prisma.TransactionDeleteManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionDeleteManyArgs<DefaultArgs>
    >,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.deleteMany(args));
  }

  updateMany$<T extends Prisma.TransactionUpdateManyArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpdateManyArgs<DefaultArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.updateMany(args));
  }

  upsert$<T extends Prisma.TransactionUpsertArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpsertArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$TransactionPayload<DefaultArgs>, T>> {
    return from(this.transaction.upsert(args));
  }

  count$<T extends Prisma.TransactionCountArgs<DefaultArgs>>(
    args?: Prisma.Subset<T, Prisma.TransactionCountArgs<DefaultArgs>>,
  ): Observable<
    T extends Record<'select', any>
      ? T['select'] extends true
        ? number
        : {
            [P in keyof T['select']]: P extends keyof Prisma.TransactionCountAggregateOutputType
              ? Prisma.TransactionCountAggregateOutputType[P]
              : never;
          }
      : number
  > {
    return from(this.transaction.count(args));
  }

  aggregate$<T extends Prisma.TransactionAggregateArgs<DefaultArgs>>(
    args: Prisma.Subset<T, Prisma.TransactionAggregateArgs<DefaultArgs>>,
  ): Observable<Prisma.GetTransactionAggregateType<T>> {
    return from(this.transaction.aggregate(args));
  }
}
