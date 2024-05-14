import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';
import { TransactionProductModel } from './transaction-product.model';
import { UserModel } from './user.model';

@Entity('product')
export class ProductModel {
  @PrimaryGeneratedColumn('uuid')
  uuid: string;

  @Column()
  name: string;

  @Column()
  stock: number;

  @Column()
  price: number;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToMany(() => TransactionProductModel, (trx) => trx.product)
  transactions: TransactionProductModel[];

  @OneToMany(
    () => TransactionProductModel,
    (transactionProduct) => transactionProduct.transaction,
    {
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  )
  transactionsProducts: TransactionProductModel[];

  @ManyToOne(() => UserModel, (user) => user.products)
  sellerUser: UserModel;
}
