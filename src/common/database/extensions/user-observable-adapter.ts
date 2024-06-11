import { Observable, from } from 'rxjs';
import { AddSufix, Omit, AssingTypeToReturnType } from 'src/common/utils/types';
import { Prisma } from '@prisma/client';
import { Record as PrismaRecord } from '@prisma/client/runtime/library';

import * as runtime from '@prisma/client/runtime/library';
import $Extensions = runtime.Types.Extensions;
import $Result = runtime.Types.Result;

export class UserObservableAdapter<
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
> implements
    AssingTypeToReturnType<
      AddSufix<Omit<Prisma.UserDelegate, 'groupBy' | 'fields'>>,
      any
    >
{
  constructor(private readonly user: Prisma.UserDelegate<ExtArgs>) {}

  findUnique$<T extends Prisma.UserFindUniqueArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserFindUniqueArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUnique'>
  > {
    return from(this.user.findUnique(args));
  }

  findUniqueOrThrow$<T extends Prisma.UserFindUniqueOrThrowArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindUniqueOrThrowArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findUniqueOrThrow'>
  > {
    return from(this.user.findUniqueOrThrow(args));
  }

  findFirst$<T extends Prisma.UserFindFirstArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindFirstArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirst'>
  > {
    return from(this.user.findFirst(args));
  }

  findFirstOrThrow$<T extends Prisma.UserFindFirstOrThrowArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindFirstOrThrowArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findFirstOrThrow'>
  > {
    return from(this.user.findFirstOrThrow(args));
  }

  findMany$<T extends Prisma.UserFindManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserFindManyArgs<ExtArgs>>,
  ): Observable<
    $Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'findMany'>
  > {
    return from(this.user.findMany(args));
  }

  create$<T extends Prisma.UserCreateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserCreateArgs<ExtArgs>>,
  ): Observable<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'create'>> {
    return from(this.user.create(args));
  }

  createMany$<T extends Prisma.UserCreateManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserCreateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.user.createMany(args));
  }

  delete$<T extends Prisma.UserDeleteArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserDeleteArgs<ExtArgs>>,
  ): Observable<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'delete'>> {
    return from(this.user.delete(args));
  }

  update$<T extends Prisma.UserUpdateArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateArgs<ExtArgs>>,
  ): Observable<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'update'>> {
    return from(this.user.update(args));
  }

  deleteMany$<T extends Prisma.UserDeleteManyArgs<ExtArgs>>(
    args?: Prisma.SelectSubset<T, Prisma.UserDeleteManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.user.deleteMany(args));
  }

  updateMany$<T extends Prisma.UserUpdateManyArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserUpdateManyArgs<ExtArgs>>,
  ): Observable<Prisma.BatchPayload> {
    return from(this.user.updateMany(args));
  }

  upsert$<T extends Prisma.UserUpsertArgs<ExtArgs>>(
    args: Prisma.SelectSubset<T, Prisma.UserUpsertArgs<ExtArgs>>,
  ): Observable<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, 'upsert'>> {
    return from(this.user.upsert(args));
  }

  count$<T extends Prisma.UserCountArgs<ExtArgs>>(
    args?: Prisma.Subset<T, Prisma.UserCountArgs<ExtArgs>>,
  ): Observable<
    T extends PrismaRecord<'select', any>
      ? T['select'] extends true
        ? number
        : {
            [P in keyof T['select']]: P extends keyof Prisma.UserCountAggregateOutputType
              ? Prisma.UserCountAggregateOutputType[P]
              : never;
          }
      : number
  > {
    return from(this.user.count(args));
  }

  aggregate$<T extends Prisma.UserAggregateArgs<ExtArgs>>(
    args: Prisma.Subset<T, Prisma.UserAggregateArgs<ExtArgs>>,
  ): Observable<Prisma.GetUserAggregateType<T>> {
    return from(this.user.aggregate(args));
  }
}
