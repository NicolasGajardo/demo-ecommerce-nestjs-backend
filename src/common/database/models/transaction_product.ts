import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Product } from './product';
import { Transaction } from './transaction';

@Entity()
export class TransactionProduct {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(
    () => Transaction,
    (transaction) => transaction.transactionsProducts,
  )
  @JoinColumn()
  transaction: Transaction;

  @ManyToOne(() => Product)
  @JoinColumn()
  products: Product[];
}
