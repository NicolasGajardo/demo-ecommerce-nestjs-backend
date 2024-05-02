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

@Entity()
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

  @OneToMany(() => TransactionProductModel, (trx) => trx.products)
  transactions: TransactionProductModel[];

  @ManyToOne(() => UserModel, (user) => user.products)
  sellerUser: UserModel;
}
