import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ListProductsQueryParams } from './dto/list-products.request';
import { ProductBody } from './dto/product.body';
import { AuthGuard } from 'src/common/middlewares/auth.guard';

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
  @UseGuards(AuthGuard)
  newProduct(@Body() body: ProductBody, @Request() req: any) {
    return this.productsService.addProduct(body, req.user);
  }

  @Put()
  @UseGuards(AuthGuard)
  updateProduct(@Body() body: ProductBody) {
    return this.productsService.updateProduct(body);
  }
}
