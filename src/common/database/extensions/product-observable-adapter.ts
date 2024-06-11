import { Observable, from } from 'rxjs';
import { AddSufix, Omit, AssingTypeToReturnType } from 'src/common/utils/types';
import { Prisma } from '@prisma/client';
import { Record as PrismaRecord } from '@prisma/client/runtime/library';

import * as runtime from '@prisma/client/runtime/library';
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export class ProductObservableAdapter<
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> implements
    AssingTypeToReturnType<
      AddSufix<Omit<Prisma.ProductDelegate, 'groupBy' | 'fields'>>,
      any
    >
{
  constructor(private readonly product: Prisma.ProductDelegate<ExtArgs>) {}

  findUnique$<T extends Prisma.ProductFindUniqueArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findUnique'>
  > {
    return from(this.product.findUnique(args));
  }

  findUniqueOrThrow$<T extends Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirst'>
  > {
    return from(this.product.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.ProductFindFirstArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirst'>
  > {
    return from(this.product.findFirst(args));
  }

  findFirstOrThrow$<T extends Prisma.ProductFindFirstOrThrowArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindFirstOrThrowArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findFirstOrThrow'>
  > {
    return from(this.product.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.ProductFindManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'findMany'>
  > {
    return from(this.product.findMany(args));
  }

  create$<T extends Prisma.ProductCreateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductCreateArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'create'>
  > {
    return from(this.product.create(args));
  }

  createMany$<T extends Prisma.ProductCreateManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductCreateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.createMany(args));
  }

  delete$<T extends Prisma.ProductDeleteArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductDeleteArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'delete'>
  > {
    return from(this.product.delete(args));
  }

  update$<T extends Prisma.ProductUpdateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'update'>
  > {
    return from(this.product.update(args));
  }

  deleteMany$<T extends Prisma.ProductDeleteManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductDeleteManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.deleteMany(args));
  }

  updateMany$<T extends Prisma.ProductUpdateManyArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.updateMany(args));
  }

  upsert$<T extends Prisma.ProductUpsertArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpsertArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, 'upsert'>
  > {
    return from(this.product.upsert(args));
  }

  count$<T extends Prisma.ProductCountArgs<ExtArgs>>(
    args?: Prisma.Subset<T, Prisma.ProductCountArgs<ExtArgs>>,
  ): Observable<
    T extends PrismaRecord<'select', any>
      ? T['select'] extends true
        ? number
        : {
            [P in keyof T['select']]: P extends keyof Prisma.ProductCountAggregateOutputType
              ? Prisma.ProductCountAggregateOutputType[P]
              : never;
          }
      : number
  > {
    return from(this.product.count(args));
  }

  aggregate$<T extends Prisma.ProductAggregateArgs<ExtArgs>>(
    args: Prisma.Subset<T, Prisma.ProductAggregateArgs<ExtArgs>>,
  ): Observable<Prisma.GetProductAggregateType<T>> {
    return from(this.product.aggregate(args));
  }
}
