import { Module } from '@nestjs/common';
import { TransactionProductService } from './transaction-product.service';
import { DatabaseModule } from 'src/common/database/database.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [DatabaseModule, JwtModule],
  providers: [TransactionProductService],
  exports: [TransactionProductService],
})
export class TransactionProductModule {}
