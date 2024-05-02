import { Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from 'src/common/database/models/product.model';
import { Like, Repository } from 'typeorm';
import { GetProductsQueryParams } from './dto/get-products.query-params';
import { PostProductBody } from './dto/post-product.body';
import { UserModel } from 'src/common/database/models/user';
import { EMPTY, Observable, from, of, switchMap, throwIfEmpty } from 'rxjs';

@Injectable({ scope: Scope.REQUEST })
export class ProductsService {
  constructor(
    @InjectRepository(ProductModel)
    private productsRepository: Repository<ProductModel>,
  ) {}

  async findAll(
    req: GetProductsQueryParams,
  ): Promise<{ data: ProductModel[]; count: number }> {
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

  findById(id: string): Observable<ProductModel> {
    const product = this.productsRepository.findOneBy({
      uuid: id,
    });

    return from(product);
  }

  save(productBody: PostProductBody, seller: UserModel) {
    const { name, stock, price, description } = productBody;
    const newProduct = new ProductModel();
    newProduct.name = name;
    newProduct.stock = stock;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.sellerUser = seller;

    return from(this.productsRepository.save(newProduct));
  }

  update(productBody: PostProductBody, user: UserModel) {
    const { uuid, name, stock, price, description } = productBody;

    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: user,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product: ${uuid} was not found`),
      ),
      switchMap(() => {
        const productPayload = new ProductModel();
        productPayload.name = name;
        productPayload.stock = stock;
        productPayload.price = price;
        productPayload.description = description;

        return this.productsRepository.update({ uuid: uuid }, productPayload);
      }),
    );
  }

  delete(uuid: string, user: UserModel) {
    return from(
      this.productsRepository.existsBy({
        uuid: uuid,
        sellerUser: user,
      }),
    ).pipe(
      switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
      throwIfEmpty(
        () => new NotFoundException(`product: ${uuid} was not found`),
      ),
      switchMap(() => this.productsRepository.delete({ uuid: uuid })),
    );
  }
}
