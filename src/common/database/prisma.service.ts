import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductObservableAdapter } from './extensions/product-observable-adapter';
import { TransactionObservableAdapter } from './extensions/transaction-observable-adapter';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor(
    private readonly productObservableAdapter: ProductObservableAdapter,
    private readonly transactionObservableAdapter: TransactionObservableAdapter,
  ) {
    super();
    this.productObservableAdapter = new ProductObservableAdapter(this.product);
    this.transactionObservableAdapter = new TransactionObservableAdapter(
      this.transaction,
    );
  }

  async onModuleInit() {
    await this.$connect();
  }

  get productObsAdapter(): ProductObservableAdapter {
    return this.productObservableAdapter;
  }

  get transactionObsAdapter(): TransactionObservableAdapter {
    return this.transactionObservableAdapter;
  }
}
