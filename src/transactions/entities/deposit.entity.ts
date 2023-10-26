import {
  TRANSACTION,
  TransactionType,
} from 'src/common/types/transaction.type';
import { Customer } from 'src/user/entities/customer.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class Deposit extends Transaction {
  @ManyToOne(() => Customer, (customer: Customer) => customer.withdrawals)
  user: Customer;

  @ManyToOne(() => Wallet, (wallet: Wallet) => wallet.withdrawals)
  wallet: Wallet;

  @Column({ default: TRANSACTION.DEPOSIT })
  type: TransactionType;
}
