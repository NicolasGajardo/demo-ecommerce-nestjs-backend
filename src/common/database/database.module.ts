import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './models/user';
import { Product } from './models/product';
import { ConfigService } from '@nestjs/config';
import { TransactionProduct } from './models/transaction_product';
import { Transaction } from './models/transaction';

const ENTITIES = [User, Product, TransactionProduct, Transaction];
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
