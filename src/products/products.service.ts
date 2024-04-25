import { Injectable, NotImplementedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/common/database/models/product';
import { Like, Repository } from 'typeorm';
import { ListProductsQueryParams } from './dto/list-products.request';
import { ProductBody } from './dto/product.body';
import { User } from 'src/common/database/models/user';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async listProducts(
    req: ListProductsQueryParams,
  ): Promise<{ data: Product[]; count: number }> {
    const { category, limit, page, sortBy } = req;

    if (!limit) {
      const [result, total] = await this.productsRepository.findAndCount();

      return {
        data: result,
        count: total,
      };
    } else {
      const take = limit || 10;
      const skip = (page || 0) * 10;

      const [result, total] = await this.productsRepository.findAndCount({
        where: { name: Like(`%${category}%`) } as any,
        order: { createdAt: sortBy || 'DESC' } as any,
        take: take,
        skip: skip,
      });

      return {
        data: result,
        count: total,
      };
    }
  }

  async getProduct(idProduct: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      uuid: idProduct,
    });

    return product;
  }

  async addProduct(productBody: ProductBody, seller: User) {
    const newProduct = new Product();
    newProduct.uuid = productBody.uuid;
    newProduct.name = productBody.name;
    newProduct.stock = productBody.stock;
    newProduct.price = productBody.price;
    newProduct.description = productBody.description;
    newProduct.sellerUser = seller;

    await this.productsRepository.insert(newProduct);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateProduct(productBody: ProductBody) {
    throw new NotImplementedException(
      'This method is currently not implemented.',
    );
  }
}
