import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ListProductsRequest } from './dto/list-products.request';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('products')
  listProducts(@Param() listProductsDto: ListProductsRequest) {
    return this.productsService.listProducts(
      listProductsDto.category,
      listProductsDto.limit,
      listProductsDto.page,
      listProductsDto.sortBy,
    );
  }
}
