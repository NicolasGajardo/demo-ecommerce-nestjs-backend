import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ListProductsQueryParams } from './dto/list-products.request';
import { ProductBody } from './dto/product.body';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() listProductsDto: ListProductsQueryParams) {
    return this.productsService.listProducts(listProductsDto);
  }

  @Get()
  getProduct(@Param('id') productId: string) {
    return this.productsService.getProduct(productId);
  }

  @Post()
  newProduct(@Body() body: ProductBody) {
    return this.productsService.addProduct(body);
  }

  @Put()
  updateProduct(@Body() body: ProductBody) {
    return this.productsService.updateProduct(body);
  }
}
