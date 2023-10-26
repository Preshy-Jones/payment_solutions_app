import { Exclude } from 'class-transformer';
import { type } from 'os';
import { EntityContainer } from 'src/common/types/entity';
import { KYC_STATUS, KycStatus } from 'src/common/types/status.type';
import { Column, Entity, OneToOne } from 'typeorm';
import { Customer } from './customer.entity';

@Entity()
export class CustomerKyc extends EntityContainer {
  @Column({ nullable: true })
  public bvnName: string;

  @Column({ nullable: true })
  public bvnDob: string;

  @Column({ nullable: true })
  public bvnNationality: string;

  @Column({ nullable: true })
  public bvnGender: string;

  @Column({ nullable: true })
  public kycIdDocument: string;

  @Column({ default: KYC_STATUS.PENDING })
  public status: KycStatus;

  @Exclude()
  @Column({ nullable: true })
  bvn: string;

  @OneToOne(() => Customer, (customer: Customer) => customer.kyc)
  public user: Customer;

  @Column()
  public userId: number;
}
