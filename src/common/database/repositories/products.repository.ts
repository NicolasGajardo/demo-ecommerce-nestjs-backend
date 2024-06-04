import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, of, switchMap } from 'rxjs';
import {
  Deletable,
  Findable,
  Savable,
  Updatable,
} from './repository-interfaces';
import { Product as ProductModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AssingObjectTypeToProps, XOR } from 'src/common/utils/types';
import { ProductObservableAdapter } from '../extensions/product-observable-adapter';

@Injectable()
export class ProductsRepository
  implements
    Findable<ProductModel>,
    Savable<ProductModel>,
    Updatable<ProductModel>,
    Deletable
{
  constructor(private readonly prisma: PrismaService) {}

  public get native(): Prisma.ProductDelegate {
    return this.prisma.product;
  }

  public get obsAdapter(): ProductObservableAdapter {
    return this.prisma.productObsAdapter;
  }

  findAndCount(
    searchColumns: Partial<ProductModel>,
    searchOptions?: {
      sortBy: AssingObjectTypeToProps<ProductModel, Prisma.SortOrder>;
      skip: number;
      take: number;
    },
  ): Observable<{ data: ProductModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<any> = this.prisma.productObsAdapter.findMany$({
      skip,
      take,
      where,
      orderBy: sortBy,
    });

    const total$: Observable<any> = this.prisma.productObsAdapter.count$({
      where,
    });

    return forkJoin({ data: data$, count: total$ });
  }

  findById(id: string): Observable<ProductModel> {
    return this.prisma.productObsAdapter.findUnique$({
      where: { id: id },
    });
  }

  save(
    payload: XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>,
  ): Observable<Pick<ProductModel, 'id'>> {
    return this.prisma.productObsAdapter.create$({
      data: payload,
      select: { id: true },
    });
  }

  updateById(id: string, payload: Partial<ProductModel>): Observable<null> {
    return this.prisma.productObsAdapter
      .update$({
        data: payload,
        where: { id: id },
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  updateBy(
    where: Prisma.ProductWhereUniqueInput,
    payload: Partial<ProductModel>,
  ): Observable<null> {
    return this.prisma.productObsAdapter
      .update$({
        data: payload,
        where: where,
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  deleteById(id: string): Observable<void> {
    return this.prisma.productObsAdapter
      .delete$({
        where: { id: id },
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }

  deleteBy(where: Prisma.ProductWhereUniqueInput): Observable<void> {
    return this.prisma.productObsAdapter
      .delete$({
        where: where,
        select: { id: true },
      })
      .pipe(switchMap(() => of(null)));
  }
}
