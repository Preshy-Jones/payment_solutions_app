import { Currency } from 'src/common/types/currency.type';
import { TransactionStatus } from 'src/common/types/status.type';
import { TRANSFER_TYPES, TransferTypes } from 'src/common/types/transfer.type';
import { Customer } from 'src/user/entities/customer.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Transfer } from './transfer.entity';

@Entity()
export class SendTransfer extends Transfer {
  @Column()
  public currency: Currency;

  @Column({ default: TRANSFER_TYPES.SEND })
  public type: TransferTypes;

  @ManyToOne(() => Customer, (user: Customer) => user.sentTransfers)
  @JoinColumn({ name: 'receiveuserid' })
  public receiveuser: Customer;

  @ManyToOne(() => Customer, (user: Customer) => user.sentTransfers)
  @JoinColumn({ name: 'senduserid' })
  public senduser: Customer;

  @ManyToOne(() => Wallet, (wallet: Wallet) => wallet.sentTransfers)
  public sendWallet: Wallet;

  @Column()
  public senduserid: number;

  @Column()
  public sendWalletId: number;

  @Column()
  public receiveuserid: number;

  @Column({ type: 'real' })
  public balance: string;

  @Column()
  public status: TransactionStatus;

  @Column()
  public email: string;
}
