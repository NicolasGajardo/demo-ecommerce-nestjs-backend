import { Injectable, Scope } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import { Product as ProductModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class ProductsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAndCount$(
    searchColumns: Prisma.ProductWhereInput,
    searchOptions?: {
      sortBy: Prisma.ProductOrderByWithRelationInput;
      skip: number;
      take: number;
    },
  ): Observable<{ data: ProductModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<ProductModel[]> =
      this.prisma.productObsAdapter.findMany$({
        skip,
        take,
        where,
        orderBy: sortBy,
      });

    const total$: Observable<number> = this.prisma.productObsAdapter.count$({
      where,
    });

    return forkJoin({ data: data$, count: total$ });
  }
}
