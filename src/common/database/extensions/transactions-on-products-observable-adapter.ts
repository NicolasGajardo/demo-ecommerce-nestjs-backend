import { Observable, from } from 'rxjs';
import { AddSufix, Omit, AssingTypeToReturnType } from 'src/common/utils/types';
import { Prisma } from '@prisma/client';
import { Record as PrismaRecord } from '@prisma/client/runtime/library';

import * as runtime from '@prisma/client/runtime/library';
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export class TransactionsOnProductsObservableAdapter<
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> implements
    AssingTypeToReturnType<
      AddSufix<
        Omit<Prisma.TransactionsOnProductsDelegate, 'groupBy' | 'fields'>
      >,
      any
    >
{
  constructor(
    private readonly transactionsOnProducts: Prisma.TransactionsOnProductsDelegate<ExtArgs>,
  ) {}

  findUnique$<T extends Prisma.TransactionsOnProductsFindUniqueArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsFindUniqueArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'findUnique'
    >
  > {
    return from(this.transactionsOnProducts.findUnique(args));
  }

  findUniqueOrThrow$<
    T extends Prisma.TransactionsOnProductsFindUniqueOrThrowArgs<ExtArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsFindUniqueOrThrowArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'findUniqueOrThrow'
    >
  > {
    return from(this.transactionsOnProducts.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.TransactionsOnProductsFindFirstArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsFindFirstArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'findFirst'
    >
  > {
    return from(this.transactionsOnProducts.findFirst(args));
  }

  findFirstOrThrow$<
    T extends Prisma.TransactionsOnProductsFindFirstOrThrowArgs<ExtArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsFindFirstOrThrowArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'findFirstOrThrow'
    >
  > {
    return from(this.transactionsOnProducts.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.TransactionsOnProductsFindManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsFindManyArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'findMany'
    >
  > {
    return from(this.transactionsOnProducts.findMany(args));
  }

  create$<T extends Prisma.TransactionsOnProductsCreateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsCreateArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'create'
    >
  > {
    return from(this.transactionsOnProducts.create(args));
  }

  createMany$<T extends Prisma.TransactionsOnProductsCreateManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsCreateManyArgs<ExtArgs>
    >,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transactionsOnProducts.createMany(args));
  }

  delete$<T extends Prisma.TransactionsOnProductsDeleteArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsDeleteArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'delete'
    >
  > {
    return from(this.transactionsOnProducts.delete(args));
  }

  update$<T extends Prisma.TransactionsOnProductsUpdateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsUpdateArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'update'
    >
  > {
    return from(this.transactionsOnProducts.update(args));
  }

  deleteMany$<T extends Prisma.TransactionsOnProductsDeleteManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsDeleteManyArgs<ExtArgs>
    >,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transactionsOnProducts.deleteMany(args));
  }

  updateMany$<T extends Prisma.TransactionsOnProductsUpdateManyArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsUpdateManyArgs<ExtArgs>
    >,
  ): Observable<Prisma.BatchPayload> {
    return from(this.transactionsOnProducts.updateMany(args));
  }

  upsert$<T extends Prisma.TransactionsOnProductsUpsertArgs<ExtArgs>>(
    args: Prisma.SelectSubset<
      T,
      Prisma.TransactionsOnProductsUpsertArgs<ExtArgs>
    >,
  ): Observable<
    $Result.GetResult<
      Prisma.$TransactionsOnProductsPayload<ExtArgs>,
      T,
      'upsert'
    >
  > {
    return from(this.transactionsOnProducts.upsert(args));
  }

  count$<T extends Prisma.TransactionsOnProductsCountArgs<ExtArgs>>(
    args?: Prisma.Subset<T, Prisma.TransactionsOnProductsCountArgs<ExtArgs>>,
  ): Observable<
    T extends PrismaRecord<'select', any>
      ? T['select'] extends true
        ? number
        : {
            [P in keyof T['select']]: P extends keyof Prisma.TransactionsOnProductsCountAggregateOutputType
              ? Prisma.TransactionsOnProductsCountAggregateOutputType[P]
              : never;
          }
      : number
  > {
    return from(this.transactionsOnProducts.count(args));
  }

  aggregate$<T extends Prisma.TransactionsOnProductsAggregateArgs<ExtArgs>>(
    args: Prisma.Subset<T, Prisma.TransactionsOnProductsAggregateArgs<ExtArgs>>,
  ): Observable<Prisma.GetTransactionsOnProductsAggregateType<T>> {
    return from(this.transactionsOnProducts.aggregate(args));
  }
}
