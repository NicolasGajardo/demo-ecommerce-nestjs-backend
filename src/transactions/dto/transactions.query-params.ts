import { Prisma } from '@prisma/client';

export class TransactionsQueryParams {
  public sortBy?: Prisma.SortOrder;
  public page?: number;
  public limit?: number;
}
