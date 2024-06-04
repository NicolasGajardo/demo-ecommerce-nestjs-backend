import { Prisma } from '@prisma/client';
import {
  DefaultArgs,
  GetFindResult,
  Record,
} from '@prisma/client/runtime/library';
import { Observable, from } from 'rxjs';
import { AddSufix, FilterAndOmit } from 'src/common/utils/types';

export class ProductObservableAdapter
  implements
    AddSufix<FilterAndOmit<Prisma.ProductDelegate, () => any, 'groupBy'>, '$'>
{
  constructor(private readonly product: Prisma.ProductDelegate) {}

  findUnique$<T extends Prisma.ProductFindUniqueArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductFindUniqueArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.findUnique(args));
  }

  findUniqueOrThrow$<
    T extends Prisma.ProductFindUniqueOrThrowArgs<DefaultArgs>,
  >(
    args?: Prisma.SelectSubset<
      T,
      Prisma.ProductFindUniqueOrThrowArgs<DefaultArgs>
    >,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.ProductFindFirstArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindFirstArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.findFirst(args));
  }

  findFirstOrThrow$<T extends Prisma.ProductFindFirstOrThrowArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<
      T,
      Prisma.ProductFindFirstOrThrowArgs<DefaultArgs>
    >,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.ProductFindManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductFindManyArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>[]> {
    return from(this.product.findMany(args));
  }

  create$<T extends Prisma.ProductCreateArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductCreateArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.create(args));
  }

  createMany$<T extends Prisma.ProductCreateManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductCreateManyArgs<DefaultArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.createMany(args));
  }

  delete$<T extends Prisma.ProductDeleteArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductDeleteArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.delete(args));
  }

  update$<T extends Prisma.ProductUpdateArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.update(args));
  }

  deleteMany$<T extends Prisma.ProductDeleteManyArgs<DefaultArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.ProductDeleteManyArgs<DefaultArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.deleteMany(args));
  }

  updateMany$<T extends Prisma.ProductUpdateManyArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpdateManyArgs<DefaultArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.product.updateMany(args));
  }

  upsert$<T extends Prisma.ProductUpsertArgs<DefaultArgs>>(
    args: Prisma.SelectSubset<T, Prisma.ProductUpsertArgs<DefaultArgs>>,
  ): Observable<GetFindResult<Prisma.$ProductPayload<DefaultArgs>, T>> {
    return from(this.product.upsert(args));
  }

  count$<T extends Prisma.ProductCountArgs<DefaultArgs>>(
    args?: Prisma.Subset<T, Prisma.ProductCountArgs<DefaultArgs>>,
  ): Observable<
    T extends Record<'select', any>
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

  aggregate$<T extends Prisma.ProductAggregateArgs<DefaultArgs>>(
    args: Prisma.Subset<T, Prisma.ProductAggregateArgs<DefaultArgs>>,
  ): Observable<Prisma.GetProductAggregateType<T>> {
    return from(this.product.aggregate(args));
  }
}
