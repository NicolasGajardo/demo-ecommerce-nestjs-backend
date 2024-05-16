import { Prisma } from '@prisma/client';

export class ProductsQueryParams {
  public category?: string;
  public sortBy?: Prisma.SortOrder;
  public page?: number;
  public limit?: number;
}
