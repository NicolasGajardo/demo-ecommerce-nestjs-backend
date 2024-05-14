import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [ProductsController],
  providers: [ProductsService],
  imports: [DatabaseModule, JwtModule],
  exports: [ProductsService],
})
export class ProductsModule {}
