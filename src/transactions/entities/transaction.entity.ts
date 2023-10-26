import { Column } from 'typeorm';
import { TransactionStatus } from 'src/common/types/status.type';
import { Currency } from 'src/common/types/currency.type';
import { BankServices } from 'src/common/types/service.type';
import { EntityContainer } from 'src/common/types/entity';
import { TransactionModes } from 'src/common/types/transaction.type';

export abstract class Transaction extends EntityContainer {
  @Column()
  public amount: number;

  @Column()
  accountNumber: string;

  @Column()
  accountBank: string;

  @Column()
  currency: Currency;

  @Column()
  public mode: TransactionModes;

  @Column()
  public reference: string;

  @Column()
  public status: TransactionStatus;

  @Column()
  public serviceUsed: BankServices;

  @Column()
  public userId: number;

  @Column()
  public walletId: number;

  @Column({ type: 'real' })
  public balance: number;

  @Column()
  public remarks: string;

  @Column({ nullable: true })
  public bankName: string;

  @Column({ nullable: true })
  public accountName: string;

  @Column({ nullable: true })
  public merchantReference: string;

  @Column({ nullable: true })
  public merchantId: number;
}
