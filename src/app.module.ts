import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './common/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { ProductsModule } from './products/products.module';
import { HealthModule } from './health/health.module';
// import { CheckoutModule } from './checkout/checkout.module';
import { LoadUserMiddleware } from './common/middlewares/load-user.middleware';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    DatabaseModule,
    ProductsModule,
    HealthModule,
    // CheckoutModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()
      .exclude({ path: 'health', method: RequestMethod.GET })
      .forRoutes()
      .apply(LoadUserMiddleware)
      .forRoutes(
        { path: 'products', method: RequestMethod.POST },
        // { path: 'products', method: RequestMethod.POST },
      );
  }
}
