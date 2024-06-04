import { Observable } from 'rxjs';
import { AssingObjectTypeToProps, XOR } from '../../utils/types';
import { Prisma } from '@prisma/client';

export interface Findable<T extends { id?: string }> {
  findAndCount(
    searchColumns: Partial<T>,
    searchOptions?: {
      sortBy?: AssingObjectTypeToProps<T, Prisma.SortOrder>;
      page?: number;
      limit?: number;
    },
  ): Observable<{
    data: T[];
    count: number;
  }>;

  findById(id: string): Observable<T>;
}

export interface Savable<T extends { id?: string }> {
  save(
    payload: XOR<Prisma.ProductCreateInput, Prisma.ProductUncheckedCreateInput>,
  ): Observable<T | Pick<T, 'id'>>;
}

export interface Updatable<T extends { id?: string }> {
  updateById(
    id: string,
    payload: Partial<T>,
  ): Observable<T | Pick<T, 'id'> | void>;
  updateBy(
    where: Prisma.AtLeast<object, 'id'>,
    payload: Partial<T>,
  ): Observable<void>;
}

export interface Deletable {
  deleteById(id: string): Observable<void>;
  deleteBy(where: Prisma.AtLeast<object, 'id'>): Observable<void>;
}
