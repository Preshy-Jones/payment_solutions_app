import { AccountTypes } from 'src/common/types/account.type';
import { Customer } from 'src/user/entities/customer.entity';
import { Entity, ManyToOne, Column } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class MonnifyAccount extends Account {
  @ManyToOne(() => Customer, (customer: Customer) => customer.monnifyAccounts)
  public user: Customer;

  @Column()
  public type: AccountTypes;
}
