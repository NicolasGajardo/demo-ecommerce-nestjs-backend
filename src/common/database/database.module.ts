import { Module } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { ProductRepository } from './repositories/products.repository';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class DatabaseModule {}
