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

@Entity()
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
  )
  @JoinColumn()
  transaction: TransactionModel;

  @ManyToOne(() => ProductModel)
  @JoinColumn()
  products: ProductModel[];
}
