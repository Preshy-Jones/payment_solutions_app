import { EntityContainer } from 'src/common/types/entity';
import { ServicesType } from 'src/common/types/service.type';
import { TransactionStatus } from 'src/common/types/status.type';
import { Column } from 'typeorm';

export abstract class Activity extends EntityContainer {
  @Column()
  customer: string;

  @Column()
  userid: number;

  @Column()
  email: string;

  @Column()
  walletid: number;

  @Column()
  serviceID: string;

  @Column({ nullable: true })
  variation_code: string;

  @Column()
  transactionReference: string;

  @Column()
  service: ServicesType;

  @Column({ type: 'real' })
  amount: number;

  @Column({ type: 'real' })
  balance: number;

  @Column()
  public remarks: string;

  @Column({ nullable: true })
  status: TransactionStatus;
}
