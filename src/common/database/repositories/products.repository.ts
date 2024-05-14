import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductModel } from '../models/product.model';
import {
  DeleteResult,
  FindOptionsWhere,
  Like,
  // ObjectId,
  Repository,
  UpdateResult,
} from 'typeorm';
import { Observable, from, map } from 'rxjs';
import {
  Deletable,
  Existable,
  Findable,
  Savable,
  Updatable,
} from '../repository-interfaces';
import { RecursivePartial } from 'src/common/utils/types';

@Injectable()
export class ProductRepository
  implements
    Findable<ProductModel>,
    Savable<ProductModel>,
    Existable<ProductModel>,
    Updatable<ProductModel>,
    Deletable
{
  constructor(
    @InjectRepository(ProductModel)
    private readonly productsRepository: Repository<ProductModel>,
  ) {}
  updateBy(
    criteria: FindOptionsWhere<ProductModel>,
    payload: RecursivePartial<ProductModel>,
  ): Observable<UpdateResult> {
    return from(this.productsRepository.update(criteria, payload));
  }

  findAndCount(
    searchColumns: Partial<ProductModel>,
    searchOptions?: {
      sortBy?: 'DESC' | 'ASC';
      page?: number;
      limit?: number;
    },
  ): Observable<{ data: ProductModel[]; count: number }> {
    const { sortBy = 'DESC', page = 0, limit } = searchOptions;
    return from(
      limit
        ? this.productsRepository.findAndCount({
            where: {
              name: searchColumns?.name
                ? Like(`%${searchColumns?.name}%`)
                : null,
            },
            order: { createdAt: sortBy },
            take: limit || 10,
            skip: page * (limit || 10),
          })
        : this.productsRepository.findAndCount(),
    ).pipe(
      map((products) => {
        const [result, total] = products;
        return {
          data: result,
          count: total,
        };
      }),
    );
  }

  findBy(id: string): Observable<ProductModel> {
    return from(
      this.productsRepository.findOneBy({
        uuid: id,
      }),
    );
  }

  save(payload: Partial<ProductModel>): Observable<ProductModel> {
    return from(this.productsRepository.save(payload));
  }

  existsBy(searchColumns: FindOptionsWhere<ProductModel>): Observable<boolean> {
    return from(this.productsRepository.existsBy(searchColumns));
  }

  // updateById(uuid: string, payload: ProductModel): Observable<UpdateResult> {
  //   const searchObj = { uuid: id };
  //   // return
  //   // from(this.productsRepository.existsBy(searchObj)).pipe(
  //   //   switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
  //   //   throwIfEmpty(() => new NotFoundException(`product: ${id} was not found`)),
  //   //   switchMap(() => {
  //   //     const modelPayload: ProductModel =
  //   //       Mapper.mapProductBodyToProductModel(payload);

  //   return from(this.productsRepository.update(searchObj, payload));
  //   // .pipe(
  //   //   switchMap(() => of(searchObj)),
  //   // );
  //   // }),
  //   // );
  // }

  deleteById(id: string): Observable<DeleteResult> {
    return from(this.productsRepository.delete({ uuid: id }));

    // return from(this.productsRepository.existsBy(searchEntity)).pipe(
    //   switchMap((productExists) => (productExists ? of(productExists) : EMPTY)),
    //   throwIfEmpty(
    //     () =>
    //       new NotFoundException(`product: ${searchEntity.uuid} was not found`),
    //   ),
    //   switchMap(() => from(this.productsRepository.delete(searchEntity))),
    // );
  }
}
