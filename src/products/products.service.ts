import { Inject, Injectable, Logger, Scope } from '@nestjs/common';
import { Observable, forkJoin, from, map, of, switchMap, tap } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { PrismaService } from 'src/common/database/prisma.service';
import { Product as ProductModel } from '@prisma/client';
import { ProductsQueryParams } from './dto/products.query-params';
import { ProductBody } from './dto/product.body';
@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly prisma: PrismaService,
  ) {}

  findAll(
    productsQueryParamsDto: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { category, limit, page, sortBy = 'desc' } = productsQueryParamsDto;
    const take = Number(limit) || 10;
    const skip = Number(page) * Number(limit) || 0;
    const orderBy = { createdAt: sortBy };
    const where = { name: category };

    const data$: Observable<any> = from(
      this.prisma.product.findMany({
        skip,
        take,
        where,
        orderBy,
      }),
    );

    const total$: Observable<any> = from(
      this.prisma.product.count({
        where,
      }),
    );

    return forkJoin({ data$, total$ }).pipe(tap(Logger.debug));
  }

  findById(id: string): Observable<ProductModel> {
    return from(
      this.prisma.product.findUnique({
        where: { id: id },
      }),
    ).pipe(tap(Logger.debug));
  }

  save(body: ProductBody): Observable<ProductModel> {
    const { description, name, price, stock } = body;

    const data = {
      description: description,
      name: name,
      price: price,
      stock: stock,
      sellerUserEmail: this.req.user.email,
    };

    return from(
      this.prisma.product.create({ data: data, select: { id: true } }),
    ).pipe(
      tap(Logger.debug),
      map((product) => product.uuid),
    );
  }

  update(id: string, body: Partial<ProductBody>): Observable<void> {
    return from(
      this.prisma.product.update({
        data: body,
        where: { id: id },
      }),
    ).pipe(
      tap(Logger.debug),
      switchMap(() => of(null)),
    );
  }

  delete(id: string): Observable<void> {
    return from(
      this.prisma.product.delete({
        where: { id: id },
      }),
    ).pipe(
      tap(Logger.debug),
      switchMap(() => of(null)),
    );
  }
}
