import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductsRepository } from './repositories/products.repository';
import { TransactionsRepository } from './repositories/transactions.repository';

@Module({
  providers: [PrismaService, ProductsRepository, TransactionsRepository],
  exports: [PrismaService, ProductsRepository, TransactionsRepository],
})
export class DatabaseModule {}
