import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsQueryParams } from './dto/products.query-params';
import { ProductBody } from './dto/product.body';
import { JwtAuthGuard } from 'src/auth/auth.guard';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { Product as ProductModel } from '@prisma/client';

@Controller({ path: 'products', scope: Scope.REQUEST })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @HttpCode(HttpStatus.OK)
  @Get()
  getProducts(
    @Query() productsQueryParamsDto: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    return this.productsService.findAll(productsQueryParamsDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get(':id')
  getProduct(@Param('id') id: string): Observable<ProductModel> {
    return this.productsService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.CREATED)
  @Post()
  newProduct(
    @Body() body: ProductBody,
    @Res() res: Response,
  ): Observable<Response> {
    return this.productsService.save(body).pipe(
      map((product) => {
        return res
          .location('/products/' + product.id)
          .status(HttpStatus.CREATED)
          .send();
      }),
    );
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Put(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: ProductBody,
  ): Observable<void> {
    return this.productsService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteProduct(@Param('id') id: string): Observable<void> {
    return this.productsService.delete(id);
  }

  // TODO: Agregar sección de comentarios
}
