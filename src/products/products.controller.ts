import { Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { ListProductsRequest } from 'src/dto/list-products.request';

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

  @UseGuards(AuthGuard)
  @Post()
  checkout() {
    this.productsService.checkout();
  }
}
