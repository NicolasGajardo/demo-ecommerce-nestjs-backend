import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ProductModel } from 'src/common/database/models/product.model';
import { DeleteResult } from 'typeorm';
import { ProductsQueryParams } from './dto/products.query-params';
import { ProductBody } from './dto/product.body';
import { EMPTY, Observable, from, of, switchMap, throwIfEmpty } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { Mapper } from 'src/common/utils/mapper';
import { ProductRepository } from 'src/common/database/repositories/products.repository';
import { UserModel } from 'src/common/database/models/user.model';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly productsRepository: ProductRepository,
  ) {}

  findAll(
    req: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { category, limit, page, sortBy } = req;
    return this.productsRepository.findAndCount(
      { name: category },
      { sortBy: sortBy, page: page, limit: limit },
    );
  }

  findById(id: string): Observable<ProductModel> {
    return from(this.productsRepository.findBy(id)).pipe(
      switchMap((transactionExists) =>
        transactionExists ? of(transactionExists) : EMPTY,
      ),
      throwIfEmpty(() => new NotFoundException(`product: ${id} was not found`)),
    );
  }

  save(productBody: ProductBody): Observable<ProductModel> {
    const newProduct: ProductModel = Mapper.mapProductBodyToProductModel(
      productBody,
      this.req.user,
    );

    return from(this.productsRepository.save(newProduct));
  }

  update(uuid: string, productBody: Partial<ProductBody>): Observable<string> {
    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: this.req.user as UserModel,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product: ${uuid} was not found`),
      ),
      switchMap(() => {
        const productPayload: ProductModel =
          Mapper.mapProductBodyToProductModel(productBody);

        return from(
          this.productsRepository.updateBy({ uuid: uuid }, productPayload),
        ).pipe(switchMap(() => of(uuid)));
      }),
    );
  }

  delete(uuid: string): Observable<DeleteResult> {
    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: this.req.user,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product: ${uuid} was not found`),
      ),
      switchMap(() => from(this.productsRepository.deleteById(uuid))),
    );
  }
}
