import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { ProductRepository } from './repositories/products.repository';

@Module({
  providers: [PrismaService, ProductRepository],
  exports: [PrismaService, ProductRepository],
})
export class DatabaseModule {}
