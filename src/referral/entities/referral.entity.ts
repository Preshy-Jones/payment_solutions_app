import { EntityContainer } from 'src/common/types/entity';
import { Customer } from 'src/user/entities/customer.entity';
import { Column, Entity, ManyToOne, OneToOne } from 'typeorm';

@Entity()
export class Referral extends EntityContainer {
  @ManyToOne(() => Customer, (customer: Customer) => customer.referrals)
  public referredBy: Customer;

  @Column()
  public referredById: number;

  @OneToOne(() => Customer, (customer: Customer) => customer.referredBy)
  public referred: Customer;

  @OneToOne(() => Customer, (customer: Customer) => customer.referredBy)
  public referredId: number;
}
