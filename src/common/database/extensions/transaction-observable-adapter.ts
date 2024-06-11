import { Observable, from } from 'rxjs';
import { AddSufix, Omit, AssingTypeToReturnType } from 'src/common/utils/types';
import { Prisma } from '@prisma/client';
import { Record as PrismaRecord } from '@prisma/client/runtime/library';

import * as runtime from '@prisma/client/runtime/library';
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export class TransactionObservableAdapter<
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> implements
    AssingTypeToReturnType<
      AddSufix<Omit<Prisma.TransactionDelegate, 'groupBy' | 'fields'>>,
      any
    >
{
  constructor(
    private readonly transaction: Prisma.TransactionDelegate<ExtArgs>,
  ) {}

  findUnique$<T extends Prisma.TransactionFindUniqueArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionFindUniqueArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findUnique'>
  > {
    return from(this.transaction.findUnique(args));
  }

  findUniqueOrThrow$<
    T extends Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionPayload<ExtArgs>,
      T,
      'findUniqueOrThrow'
    >
  > {
    return from(this.transaction.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.TransactionFindFirstArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionFindFirstArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findFirst'>
  > {
    return from(this.transaction.findFirst(args));
  }

  findFirstOrThrow$<T extends Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionPayload<ExtArgs>,
      T,
      'findFirstOrThrow'
    >
  > {
    return from(this.transaction.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.TransactionFindManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionFindManyArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'findMany'>
  > {
    return from(this.transaction.findMany(args));
  }

  create$<T extends Prisma.TransactionCreateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionCreateArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'create'>
  > {
    return from(this.transaction.create(args));
  }

  createMany$<T extends Prisma.TransactionCreateManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionCreateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.createMany(args));
  }

  delete$<T extends Prisma.TransactionDeleteArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionDeleteArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'delete'>
  > {
    return from(this.transaction.delete(args));
  }

  update$<T extends Prisma.TransactionUpdateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpdateArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'update'>
  > {
    return from(this.transaction.update(args));
  }

  deleteMany$<T extends Prisma.TransactionDeleteManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.TransactionDeleteManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.deleteMany(args));
  }

  updateMany$<T extends Prisma.TransactionUpdateManyArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpdateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transaction.updateMany(args));
  }

  upsert$<T extends Prisma.TransactionUpsertArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.TransactionUpsertArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, 'upsert'>
  > {
    return from(this.transaction.upsert(args));
  }

  count$<T extends Prisma.TransactionCountArgs<ExtArgs>>(
    args?: Prisma.Subset<T, Prisma.TransactionCountArgs<ExtArgs>>,
  ): Observable<
    T extends PrismaRecord<'select', any>
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

  aggregate$<T extends Prisma.TransactionAggregateArgs<ExtArgs>>(
    args: Prisma.Subset<T, Prisma.TransactionAggregateArgs<ExtArgs>>,
  ): Observable<Prisma.GetTransactionAggregateType<T>> {
    return from(this.transaction.aggregate(args));
  }
}
