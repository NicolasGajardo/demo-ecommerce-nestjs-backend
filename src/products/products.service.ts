import { Inject, Injectable, Scope } from '@nestjs/common';
import {
  EMPTY,
  Observable,
  forkJoin,
  from,
  map,
  of,
  switchMap,
  tap,
  throwIfEmpty,
} from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { PrismaService } from 'src/common/database/prisma.service';
import { Prisma, product as ProductModel } from '@prisma/client';
@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    // private readonly productsRepository: ProductRepository,
    private readonly prisma: PrismaService,
  ) {}

  findAll(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.productWhereUniqueInput;
    where?: Prisma.productWhereInput;
    orderBy?: Prisma.productOrderByWithRelationInput;
  }): Observable<{ data: ProductModel[]; count: number }> {
    const { skip, take, cursor, where, orderBy } = params;
    const data$: Observable<any> = from(
      this.prisma.product.findMany({
        skip,
        take,
        cursor,
        where,
        orderBy,
      }),
    );

    const total$: Observable<any> = from(
      this.prisma.product.count({
        cursor,
        where,
      }),
    );

    return forkJoin({ data$, total$ }).pipe(tap(console.log));
  }

  findById(
    productWhereUniqueInput: Prisma.productWhereUniqueInput,
  ): Observable<ProductModel> {
    return from(
      this.prisma.product.findUnique({
        where: productWhereUniqueInput,
      }),
    ).pipe(tap(console.log));

    // return from(this.productsRepository.findBy(id)).pipe(
    //   switchMap((transactionExists) =>
    //     transactionExists ? of(transactionExists) : EMPTY,
    //   ),
    //   throwIfEmpty(() => new NotFoundException(`product: ${id} was not found`)),
    // );
  }

  save(data: Prisma.productCreateInput): Observable<ProductModel> {
    // const newProduct: ProductModel = Mapper.mapProductBodyToProductModel(
    //   productBody,
    //   this.req.user,
    // );

    return from(this.prisma.product.create({ data })).pipe(tap(console.log));
  }

  update(params: {
    where: Prisma.productWhereUniqueInput;
    data: Prisma.productUpdateInput;
  }): Observable<ProductModel> {
    const { where, data } = params;
    return from(
      this.prisma.product.update({
        data,
        where,
      }),
    ).pipe(tap(console.log));
  }

  delete(where: Prisma.productWhereUniqueInput): Observable<ProductModel> {
    return from(
      this.prisma.product.delete({
        where,
      }),
    ).pipe(
      tap(console.log),
      // switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      // throwIfEmpty(
      //   () => new NotFoundException(`product: ${uuid} was not found`),
      // ),
      // switchMap(() => from(this.productsRepository.deleteById(uuid))),
    );
  }
}
