import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  Scope,
  UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { GetProductsQueryParams } from './dto/get-products.query-params';
import { PostProductBody } from './dto/post-product.body';
import { ExpressRequest } from 'src/common/utils/interfaces';
import { JwtAuthGuard } from 'src/common/middlewares/auth.guard';
import { HttpStatusCode } from 'axios';
import { Observable, map } from 'rxjs';
import { Response } from 'express';

@Controller({ path: 'products', scope: Scope.REQUEST })
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  getProducts(@Query() productsQueryParamsDto: GetProductsQueryParams) {
    return this.productsService.findAll(productsQueryParamsDto);
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.productsService.findById(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  newProduct(
    @Req() req: ExpressRequest<PostProductBody>,
    @Res() res: Response,
  ): Observable<Response> {
    return this.productsService.save(req.body, req.user).pipe(
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
    @Req() req: ExpressRequest<PostProductBody>,
    @Res() res: Response,
  ) {
    return this.productsService.update(req.body, req.user).pipe(
      map(() => {
        return res.status(HttpStatusCode.NoContent).send();
      }),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteProduct(
    @Param('id') id: string,
    @Req() req: ExpressRequest<void>,
    @Res() res: Response,
  ) {
    return this.productsService.delete(id, req.user).pipe(
      map(() => {
        return res.status(HttpStatusCode.NoContent).send();
      }),
    );
  }

  // TODO: Agregar sección de comentarios
}
