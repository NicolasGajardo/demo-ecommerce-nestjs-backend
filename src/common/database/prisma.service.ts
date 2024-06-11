import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductObservableAdapter } from './extensions/product-observable-adapter';
import { TransactionObservableAdapter } from './extensions/transaction-observable-adapter';
import { TransactionsOnProductsObservableAdapter } from './extensions/transactions-on-products-observable-adapter';
import { UserObservableAdapter } from './extensions/user-observable-adapter';

import * as runtime from '@prisma/client/runtime/library';
import $Extensions = runtime.Types.Extensions;

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService<
    T extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
    U = 'log' extends keyof T
      ? T['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition>
        ? Prisma.GetEvents<T['log']>
        : never
      : never,
    ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs,
  >
  extends PrismaClient<T, U, ExtArgs>
  implements OnModuleInit
{
  constructor() {
    super();
    this.productObservableAdapter = new ProductObservableAdapter<ExtArgs>(
      this.product,
    );
    this.transactionObservableAdapter =
      new TransactionObservableAdapter<ExtArgs>(this.transaction);
    this.transactionsOnProductsObservableAdapter =
      new TransactionsOnProductsObservableAdapter<ExtArgs>(
        this.transactionsOnProducts,
      );
    this.userObservableAdapter = new UserObservableAdapter<ExtArgs>(this.user);
  }

  private productObservableAdapter: ProductObservableAdapter<ExtArgs>;
  private transactionObservableAdapter: TransactionObservableAdapter<ExtArgs>;
  private transactionsOnProductsObservableAdapter: TransactionsOnProductsObservableAdapter<ExtArgs>;
  private userObservableAdapter: UserObservableAdapter<ExtArgs>;

  async onModuleInit() {
    await this.$connect();
  }

  get productObsAdapter(): ProductObservableAdapter<ExtArgs> {
    return this.productObservableAdapter;
  }

  get transactionObsAdapter(): TransactionObservableAdapter<ExtArgs> {
    return this.transactionObservableAdapter;
  }

  get transactionsOnProductsObsAdapter(): TransactionsOnProductsObservableAdapter<ExtArgs> {
    return this.transactionsOnProductsObservableAdapter;
  }

  get userObsAdapter(): UserObservableAdapter<ExtArgs> {
    return this.userObservableAdapter;
  }
}
