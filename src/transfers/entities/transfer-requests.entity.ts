import { Currency } from 'src/common/types/currency.type';
import { TransferRequestStatus } from 'src/common/types/status.type';
import { TRANSFER_TYPES, TransferTypes } from 'src/common/types/transfer.type';
import { Customer } from 'src/user/entities/customer.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity()
export class TransferRequest extends Transfer {
  @Column()
  public currency: Currency;

  @Column({ default: TRANSFER_TYPES.REQUEST })
  public type: TransferTypes;

  @ManyToOne(() => Customer, (user: Customer) => user.sentRequests)
  @JoinColumn({ name: 'fromuserid' })
  public fromuser: Customer;

  @ManyToOne(() => Customer, (user: Customer) => user.receivedRequests)
  @JoinColumn({ name: 'touserid' })
  public touser: Customer;

  @Column()
  public fromuserid: number;

  @Column()
  public touserid: number;

  @Column()
  public status: TransferRequestStatus;
}
