import { AirtimeActivity } from 'src/activities/entities/airtime-activity.entity';
import { ElectricityBillActivity } from 'src/activities/entities/electricity-bill-activity.entity';
import { MobileDataActivity } from 'src/activities/entities/mobiledata-activity.entity';
import { TvSubscriptionActivity } from 'src/activities/entities/tv-subscription-activity.entity';
import { Currency } from 'src/common/types/currency.type';
import { EntityContainer } from 'src/common/types/entity';
import { WalletTypes } from 'src/common/types/wallet.type';
import { Withdrawal } from 'src/transactions/entities/withdrawal.entity';
import { ReceiveTransfer } from 'src/transfers/entities/receive-transfer.entity';
import { SendTransfer } from 'src/transfers/entities/send-transfer.entity';
import { Customer } from 'src/user/entities/customer.entity';
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Wallet extends EntityContainer {
  @Column({ type: 'real', default: 0.0 })
  public balance: number;

  @Column()
  userId: number;

  @Column()
  type: WalletTypes;

  @Column()
  currency: Currency;

  @ManyToOne(() => Customer, (customer: Customer) => customer.wallets)
  public user: Customer;

  @OneToMany(() => Withdrawal, (withdrawals: Withdrawal) => withdrawals.wallet)
  public withdrawals: Withdrawal[];

  @OneToMany(
    () => SendTransfer,
    (transfers: SendTransfer) => transfers.sendWallet,
  )
  public sentTransfers: SendTransfer[];

  @OneToMany(
    () => ReceiveTransfer,
    (transfers: ReceiveTransfer) => transfers.receiveWallet,
  )
  public receivedTransfers: ReceiveTransfer[];

  @OneToMany(
    () => TvSubscriptionActivity,
    (activity: TvSubscriptionActivity) => activity.wallet,
  )
  public tvSubscriptionActivities: TvSubscriptionActivity[];

  @OneToMany(
    () => MobileDataActivity,
    (activity: MobileDataActivity) => activity.wallet,
  )
  public mobileDataActivities: MobileDataActivity[];

  @OneToMany(
    () => ElectricityBillActivity,
    (activity: ElectricityBillActivity) => activity.wallet,
  )
  public electricityBillActivities: ElectricityBillActivity[];

  @OneToMany(
    () => AirtimeActivity,
    (activity: AirtimeActivity) => activity.wallet,
  )
  public airtimeActivities: AirtimeActivity[];
}
