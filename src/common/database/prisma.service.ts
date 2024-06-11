import { Injectable, OnModuleInit, Scope } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ProductObservableAdapter } from './extensions/product-observable-adapter';
import { TransactionObservableAdapter } from './extensions/transaction-observable-adapter';
import { TransactionsOnProductsObservableAdapter } from './extensions/transactions-on-products-observable-adapter';

@Injectable({ scope: Scope.DEFAULT })
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    this.transactionObservableAdapter = new TransactionObservableAdapter(
      this.transaction,
    );
    this.transactionsOnProductsObservableAdapter =
      new TransactionsOnProductsObservableAdapter(this.transactionsOnProducts);
    this.productObservableAdapter = new ProductObservableAdapter(this.product);
  }

  private productObservableAdapter: ProductObservableAdapter;
  private transactionObservableAdapter: TransactionObservableAdapter;
  private transactionsOnProductsObservableAdapter: TransactionsOnProductsObservableAdapter;

  async onModuleInit() {
    await this.$connect();
  }

  get productObsAdapter(): ProductObservableAdapter {
    return this.productObservableAdapter;
  }

  get transactionObsAdapter(): TransactionObservableAdapter {
    return this.transactionObservableAdapter;
  }

  get transactionsOnProductsObsAdapter(): TransactionsOnProductsObservableAdapter {
    return this.transactionsOnProductsObservableAdapter;
  }
}
