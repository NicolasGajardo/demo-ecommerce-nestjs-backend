import {
  Injectable,
  NotImplementedException,
  UnauthorizedException,
} from '@nestjs/common';
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

    const [result, total] = limit
      ? await this.productsRepository.findAndCount({
          where: { name: Like(`%${category}%`) } as any,
          order: { createdAt: sortBy || 'DESC' } as any,
          take: limit || 10,
          skip: (page || 0) * 10,
        })
      : await this.productsRepository.findAndCount();

    return {
      data: result,
      count: total,
    };
  }

  async getProduct(idProduct: string): Promise<Product> {
    const product = await this.productsRepository.findOneBy({
      uuid: idProduct,
    });

    return product;
  }

  async addProduct(productBody: ProductBody, seller: User) {
    const { uuid, name, stock, price, description } = productBody;
    const newProduct = new Product();
    newProduct.uuid = uuid;
    newProduct.name = name;
    newProduct.stock = stock;
    newProduct.price = price;
    newProduct.description = description;
    newProduct.sellerUser = seller;

    await this.productsRepository.insert(newProduct);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async updateProduct(productBody: ProductBody, currentUser: User) {
    const { uuid, name, stock, price, description } = productBody;

    const existsProduct = await this.productsRepository.existsBy({
      uuid: uuid,
      sellerUser: currentUser,
    });

    if (!existsProduct) {
      throw new UnauthorizedException();
    }

    const newProduct = new Product();
    newProduct.name = name;
    newProduct.stock = stock;
    newProduct.price = price;
    newProduct.description = description;

    this.productsRepository.update({ uuid: uuid }, newProduct);
    throw new NotImplementedException(
      'This method is currently not implemented.',
    );
  }
}
