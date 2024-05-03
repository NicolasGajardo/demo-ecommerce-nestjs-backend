import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from 'src/common/database/models/product.model';
import { Like, Repository } from 'typeorm';
import { ProductsQueryParams } from './dto/products.query-params';
import { ProductBody } from './dto/product.body';
import {
  EMPTY,
  Observable,
  from,
  map,
  of,
  switchMap,
  throwIfEmpty,
} from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { UserModel } from 'src/common/database/models/user.model';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private readonly productsRepository: Repository<ProductModel>,
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
  ) {}

  findAll(
    req: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { category, limit, page, sortBy } = req;
    return from(
      limit
        ? this.productsRepository.findAndCount({
            where: { name: category ? Like(`%${category}%`) : null },
            order: { createdAt: sortBy || 'DESC' },
            take: limit as number,
            skip: (page || 0) * (limit as number),
          })
        : this.productsRepository.findAndCount(),
    ).pipe(
      map((products) => {
        const [result, total] = products;
        return {
          data: result,
          count: total,
        };
      }),
    );
  }

  findById(id: string): Observable<ProductModel> {
    const product = this.productsRepository.findOneBy({
      uuid: id,
    });

    return from(product);
  }

  save(productBody: ProductBody): Observable<ProductModel> {
    const { name, stock, price, description } = productBody;
    const newProduct = new ProductModel();
    newProduct.name = name;
    newProduct.stock = stock;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.sellerUser = this.req.user as UserModel;

    return from(this.productsRepository.save(newProduct));
  }

  update(uuid: string, productBody: ProductBody): Observable<void> {
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
      switchMap(() => {
        const { name, stock, price, description } = productBody;

        const productPayload = new ProductModel();
        productPayload.name = name;
        productPayload.stock = stock;
        productPayload.price = price;
        productPayload.description = description;

        return from(
          this.productsRepository.update({ uuid: uuid }, productPayload),
        );
      }),
      switchMap(() => EMPTY),
    );
  }

  delete(uuid: string): Observable<void> {
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
      switchMap(() => from(this.productsRepository.delete({ uuid: uuid }))),
      switchMap(() => EMPTY),
    );
  }
}
