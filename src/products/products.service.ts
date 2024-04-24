import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/common/database/models/product';
import { Like, Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  async listProducts(
    category: string = '',
    limit: number,
    page: number,
    sortBy: 'ASC' | 'DESC' = 'DESC',
  ) {
    const take = limit || 10;
    const skip = page * 10 || 0;

    const [result, total] = await this.productsRepository.findAndCount({
      where: { name: Like('%' + category + '%') },
      order: { name: sortBy },
      take: take,
      skip: skip,
    });

    return {
      data: result,
      count: total,
    };
  }

  checkout() {
    //noop
  }
}
