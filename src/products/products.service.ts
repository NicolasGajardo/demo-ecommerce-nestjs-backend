import { Inject, Injectable, Scope } from '@nestjs/common';
import { Observable } from 'rxjs';
import { REQUEST } from '@nestjs/core';
import { AuthenticatedRequest } from 'src/auth/interface/authenticated-request.interface';
import { Product as ProductModel } from '@prisma/client';
import { ProductsQueryParams } from './dto/products.query-params';
import { ProductBody } from './dto/product.body';
import { ProductsRepository } from 'src/common/database/repositories/products.repository';
@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @Inject(REQUEST) private readonly req: AuthenticatedRequest,
    private readonly productRepository: ProductsRepository,
  ) {}

  findAll(
    productsQueryParamsDto: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { category, limit, page, sortBy } = productsQueryParamsDto;
    const take = Number(limit) || 10;
    const skip = Number(page) * Number(limit) || 0;
    const orderBy = { createdAt: sortBy };
    const where = { name: category };

    return this.productRepository.findAndCount(where, {
      skip,
      sortBy: orderBy,
      take,
    });
  }

  findById(id: string): Observable<ProductModel> {
    return this.productRepository.findById(id);
  }

  save(body: ProductBody): Observable<Pick<ProductModel, 'id'>> {
    const { description, name, price, stock } = body;

    const data = {
      description: description,
      name: name,
      price: price,
      stock: stock,
      sellerUserEmail: this.req.user.email,
    };

    return this.productRepository.save(data);
  }

  update(id: string, body: Partial<ProductBody>): Observable<void> {
    return this.productRepository.updateById(id, body);
  }

  delete(id: string): Observable<void> {
    return this.productRepository.deleteBy({
      id: id,
      sellerUserEmail: this.req.user.email,
    });
  }
}
