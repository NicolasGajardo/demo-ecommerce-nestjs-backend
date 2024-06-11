import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products.repository';
import { TransactionsRepository } from './repositories/transactions.repository';
import { TransactionsOnProductsRepository } from './repositories/transactions-on-products.repository';
import { UsersRepository } from './repositories/users.repository';

@Module({
  providers: [
    PrismaService,
    ProductsRepository,
    TransactionsRepository,
    TransactionsOnProductsRepository,
    UsersRepository,
  ],
  exports: [
    PrismaService,
    ProductsRepository,
    TransactionsRepository,
    TransactionsOnProductsRepository,
    UsersRepository,
  ],
})
export class DatabaseModule {}
