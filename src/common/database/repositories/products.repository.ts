import { Injectable } from '@nestjs/common';
import { Observable, forkJoin, from, of, switchMap } from 'rxjs';
import {
  Deletable,
  Findable,
  Savable,
  Updatable,
} from '../repository-interfaces';
import { Product as ProductModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { AssingObjectTypeToProps, XOR } from 'src/common/utils/types';

@Injectable()
export class ProductRepository
  implements
    Findable<ProductModel>,
    Savable<ProductModel>,
    Updatable<ProductModel>,
    Deletable
{
  constructor(private readonly prisma: PrismaService) {}
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

    const data$: Observable<any> = from(
      this.prisma.product.findMany({
        skip,
        take,
        where,
        orderBy: sortBy,
      }),
    );

    const total$: Observable<any> = from(
      this.prisma.product.count({
        where,
      }),
    );

    return forkJoin({ data: data$, count: total$ });
  }

  findById(id: string): Observable<ProductModel> {
    return from(
      this.prisma.product.findUnique({
        where: { id: id },
      }),
    );
  }
  save(
    payload: XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>,
  ): Observable<Pick<ProductModel, 'id'>> {
    return from(
      this.prisma.product.create({ data: payload, select: { id: true } }),
    );
  }

  updateById(id: string, payload: Partial<ProductModel>): Observable<void> {
    return from(
      this.prisma.product.update({
        data: payload,
        where: { id: id },
        select: { id: true },
      }),
    ).pipe(switchMap(() => of(null)));
  }

  deleteById(id: string): Observable<void> {
    return from(
      this.prisma.product.delete({
        where: { id: id },
        select: { id: true },
      }),
    ).pipe(switchMap(() => of(null)));
  }
}
