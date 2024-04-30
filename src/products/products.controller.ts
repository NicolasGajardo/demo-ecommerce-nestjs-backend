import {
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
import { ExpressRequest } from 'src/common/utils/interfaces';
import { FetchUserAuthGuard } from 'src/common/middlewares/fetch-user-auth.guard';

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
  @UseGuards(FetchUserAuthGuard)
  newProduct(@Request() req: ExpressRequest<ProductBody>) {
    return this.productsService.addProduct(req.body, req.user);
  }

  @Put()
  @UseGuards(FetchUserAuthGuard)
  updateProduct(@Request() req: ExpressRequest<ProductBody>) {
    return this.productsService.updateProduct(req.body, req.user);
  }
}
