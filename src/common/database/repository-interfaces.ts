import { Observable } from 'rxjs';
// import {
//   DeleteResult,
//   FindOptionsWhere,
//   ObjectId,
//   UpdateResult,
// } from 'typeorm';
// import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

type CriteriaType =
  | string
  | string[]
  | number
  | number[]
  | Date
  | Date[]
  | ObjectId
  | ObjectId[]
  | FindOptionsWhere<object>;

export interface Findable<T> {
  findAndCount(
    searchColumns: Partial<T>,
    searchOptions?: {
      sortBy?: 'DESC' | 'ASC';
      page?: number;
      limit?: number;
    },
  ): Observable<{
    data: T[];
    count: number;
  }>;
  findBy(criteria: CriteriaType): Observable<T>;
}

export interface Savable<T> {
  save(payload: Partial<T>): Observable<T>;
}

export interface Existable<T> {
  existsBy(searchColumns: FindOptionsWhere<T>): Observable<boolean>;
}

export interface Updatable<T> {
  updateBy(
    criteria: CriteriaType,
    payload: QueryDeepPartialEntity<T>,
  ): Observable<UpdateResult>;
}

export interface Deletable {
  deleteById(id: string | number): Observable<DeleteResult>;
}
