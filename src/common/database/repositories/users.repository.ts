import { Injectable, Scope } from '@nestjs/common';
import { Observable, forkJoin } from 'rxjs';
import { User as UsersModel, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma.service';

@Injectable({ scope: Scope.DEFAULT })
export class UsersRepository {
  constructor(private prisma: PrismaService) {}

  findAndCount$(
    searchColumns: Prisma.UserWhereInput,
    searchOptions?: {
      sortBy: Prisma.UserOrderByWithRelationInput;
      skip: number;
      take: number;
    },
  ): Observable<{ data: UsersModel[]; count: number }> {
    const where = searchColumns;
    const { sortBy = { createdAt: 'asc' }, skip = 0, take = 0 } = searchOptions;

    const data$: Observable<UsersModel[]> =
      this.prisma.userObsAdapter.findMany$({
        skip,
        take,
        where,
        orderBy: sortBy,
      });

    const total$: Observable<number> = this.prisma.userObsAdapter.count$({
      where,
    });

    return forkJoin({ data: data$, count: total$ });
  }
}
