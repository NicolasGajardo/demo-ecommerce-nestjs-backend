import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UserModel } from './user.model';
import { TransactionProductModel } from './transaction-product.model';

@Entity('transaction')
export class TransactionModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  price: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserModel, (user) => user.transactions)
  @JoinColumn()
  buyerUser: UserModel;

  @OneToMany(
    () => TransactionProductModel,
    (transactionProduct) => transactionProduct.transaction,
    {
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
  transactionsProducts: TransactionProductModel[];
}
