import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products.repository';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionObservableAdapter } from './extensions/transaction-observable-adapter';

@Module({
  providers: [
    PrismaService,
    ProductsRepository,
    TransactionsRepository,
    TransactionObservableAdapter,
  ],
  exports: [PrismaService, ProductsRepository, TransactionsRepository],
})
export class DatabaseModule {}
