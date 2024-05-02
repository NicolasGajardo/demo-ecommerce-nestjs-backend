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
import { JwtAuthGuard } from 'src/common/middlewares/auth.guard';
import { HttpStatusCode } from 'axios';
import { Observable, map } from 'rxjs';
import { Response } from 'express';
import { ProductModel } from 'src/common/database/models/product.model';

@Controller({ path: 'products', scope: Scope.REQUEST })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(
    @Query() productsQueryParamsDto: ProductsQueryParams,
  ): Observable<{ data: ProductModel[]; count: number }> {
    return this.productsService.findAll(productsQueryParamsDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: string): Observable<ProductModel> {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  newProduct(
    @Body() body: ProductBody,
    @Res() res: Response,
  ): Observable<Response> {
    return this.productsService.save(body).pipe(
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
    return this.productsService.update(id, body).pipe(
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
    return this.productsService.delete(id).pipe(
      map(() => {
        return res.status(HttpStatusCode.NoContent).send();
      }),
    );
  }

  // TODO: Agregar sección de comentarios
}
