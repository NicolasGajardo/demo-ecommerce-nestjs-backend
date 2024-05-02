import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModel } from './models/user.model';
import { ProductModel } from './models/product.model';
import { TransactionProductModel } from './models/transaction-product.model';
import { TransactionModel } from './models/transaction.model';

const ENTITIES = [
  UserModel,
  ProductModel,
  TransactionProductModel,
  TransactionModel,
];
const ORM_FEATURES = TypeOrmModule.forFeature(ENTITIES);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: function (config: ConfigService) {
        return {
          type: 'mysql',
          host: config.get<string>('MYSQL_HOST'),
          port: config.get<number>('MYSQL_PORT'),
          username: config.get<string>('MYSQL_USERNAME'),
          password: config.get<string>('MYSQL_PASSWORD'),
          database: config.get<string>('MYSQL_DATABASE'),
          entities: ENTITIES,
          // TODO cambiar
          synchronize: true,
        };
      },
    }),
    ORM_FEATURES,
  ],
  exports: [ORM_FEATURES],
})
export class DatabaseModule {}
