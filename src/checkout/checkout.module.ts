import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { ProductsModule } from 'src/products/products.module';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { JwtModule } from '@nestjs/jwt';
import { TransactionProductModule } from 'src/transaction-product/transaction-product.module';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService],
  imports: [
    ProductsModule,
    TransactionsModule,
    TransactionProductModule,
    JwtModule,
  ],
})
export class CheckoutModule {}
