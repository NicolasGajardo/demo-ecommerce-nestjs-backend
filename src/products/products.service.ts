import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/common/database/models/product';
import { Like, Repository } from 'typeorm';
import { ListProductsQueryParams } from './dto/list-products.query-params';
import { ProductBody } from './dto/product.body';
import { User } from 'src/common/database/models/user';
import { EMPTY, Observable, from, of, switchMap, throwIfEmpty } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async findAll(
    req: ListProductsQueryParams,
  ): Promise<{ data: Product[]; count: number }> {
    const { category, limit, page, sortBy } = req;

    const [result, total] = limit
      ? await this.productsRepository.findAndCount({
          where: { name: category ? Like(`%${category}%`) : null },
          order: { createdAt: sortBy || 'DESC' },
          take: limit,
          skip: (page || 0) * limit,
        })
      : await this.productsRepository.findAndCount();

    return {
      data: result,
      count: total,
    };
  }

  findById(id: string): Observable<Product> {
    const product = this.productsRepository.findOneBy({
      uuid: id,
    });

    return from(product);
  }

  save(productBody: ProductBody, seller: User) {
    const { name, stock, price, description } = productBody;
    const newProduct = new Product();
    newProduct.name = name;
    newProduct.stock = stock;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.sellerUser = seller;

    return from(this.productsRepository.save(newProduct));
  }

  update(productBody: ProductBody, user: User) {
    const { uuid, name, stock, price, description } = productBody;

    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: user,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product:${uuid} was not found`),
      ),
      switchMap(() => {
        const productPayload = new Product();
        productPayload.name = name;
        productPayload.stock = stock;
        productPayload.price = price;
        productPayload.description = description;

        return this.productsRepository.update({ uuid: uuid }, productPayload);
      }),
    );
  }

  delete(uuid: string, user: User) {
    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: user,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product:${uuid} was not found`),
      ),
      switchMap(() => this.productsRepository.delete({ uuid: uuid })),
    );
  }
}
