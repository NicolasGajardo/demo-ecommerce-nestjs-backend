import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';
import { CheckoutModule } from './checkout/checkout.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransactionProductModule } from './transaction-product/transaction-product.module';
import { HttpExceptionFilter } from './common/middlewares/http-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    ProductsModule,
    HealthModule,
    CheckoutModule,
    TransactionsModule,
    TransactionProductModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpExceptionFilter).exclude('health').forRoutes('api');
  }
}
