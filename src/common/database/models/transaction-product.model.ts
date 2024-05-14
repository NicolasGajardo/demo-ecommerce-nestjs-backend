import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProductModel } from './product.model';
import { TransactionModel } from './transaction.model';

@Entity('transaction_product')
export class TransactionProductModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => TransactionModel,
    (transaction) => transaction.transactionsProducts,
    {
      eager: true,
    },
  )
  @JoinColumn()
  transaction: TransactionModel;

  @ManyToOne(() => ProductModel, (product) => product.transactionsProducts, {
    eager: true,
  })
  @JoinColumn()
  product: ProductModel;
}
