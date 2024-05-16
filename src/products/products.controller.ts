import {
  Body,
  Controller,
  Delete,
  Get,
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
import { HttpStatusCode } from 'axios';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { product as ProductModel } from '@prisma/client';

@Controller({ path: 'products', scope: Scope.REQUEST })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() productsQueryParamsDto: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { category, limit, page, sortBy = 'desc' } = productsQueryParamsDto;
    return this.productsService.findAll({
      take: Number(limit) || 10,
      skip: Number(page) * Number(limit) || 0,
      orderBy: { createdAt: sortBy },
      where: { name: category },
    });
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Observable<ProductModel> {
    return this.productsService.findById({ uuid: id });
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  newProduct(
    @Body() body: ProductBody,
    @Res() res: Response,
  ): Observable<Response> {
    const { description, name, price, stock } = body;
    return this.productsService
      .save({
        description: description,
        name: name,
        price: price,
        stock: stock,
      })
      .pipe(
        map((product) => {
          return res
            .location('/products/' + product.uuid)
            .status(HttpStatusCode.Created)
            .send();
        }),
      );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateProduct(
    @Param('id') id: string,
    @Body() body: ProductBody,
    @Res() res: Response,
  ): Observable<Response> {
    return this.productsService
      .update({ data: body, where: { uuid: id } })
      .pipe(
        map(() => {
          return res.status(HttpStatusCode.NoContent).send();
        }),
      );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteProduct(
    @Param('id') id: string,
    @Res() res: Response,
  ): Observable<Response> {
    return this.productsService.delete({ uuid: id }).pipe(
      map(() => {
        return res.status(HttpStatusCode.NoContent).send();
      }),
    );
  }

  // TODO: Agregar sección de comentarios
}
