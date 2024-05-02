import {
  Entity,
  PrimaryColumn,
  Column,
  BeforeInsert,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { TransactionModel } from './transaction.model';
import { ProductModel } from './product.model';

@Entity('user')
export class UserModel {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  modifiedAt: Date;

  @OneToMany(() => TransactionModel, (transaction) => transaction.buyerUser)
  transactions: TransactionModel[];

  @OneToMany(() => ProductModel, (product) => product.sellerUser)
  products: ProductModel[];

  @BeforeInsert()
  async hashPassword(): Promise<void> {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }

  async comparePasswords(password: string): Promise<boolean> {
    return bcrypt.compareSync(password, this.password);
  }
}
