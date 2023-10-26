import { Exclude } from 'class-transformer';
import { MonnifyAccount } from 'src/account/entities/monnnify-account.entity';
import { AirtimeActivity } from 'src/activities/entities/airtime-activity.entity';
import { ElectricityBillActivity } from 'src/activities/entities/electricity-bill-activity.entity';
import { MobileDataActivity } from 'src/activities/entities/mobiledata-activity.entity';
import { TvSubscriptionActivity } from 'src/activities/entities/tv-subscription-activity.entity';
import { UserLevels, USER_LEVELS } from 'src/common/types/roles.type';
import { Referral } from 'src/referral/entities/referral.entity';
import { Withdrawal } from 'src/transactions/entities/withdrawal.entity';
import { ReceiveTransfer } from 'src/transfers/entities/receive-transfer.entity';
import { SendTransfer } from 'src/transfers/entities/send-transfer.entity';
import { TransferRequest } from 'src/transfers/entities/transfer-requests.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Column, Entity, OneToMany, OneToOne } from 'typeorm';
import { CustomerKyc } from './customer-kyc.entity';
import { User } from './user.entity';

@Entity()
export class Customer extends User {
  @Exclude()
  @Column({ nullable: true })
  public pin: string;

  @Column()
  public referralCode: string;

  @Column({ default: USER_LEVELS.ZERO })
  public level: UserLevels;

  @OneToOne(() => CustomerKyc, (customerKyc: CustomerKyc) => customerKyc.user)
  public kyc: CustomerKyc;

  @OneToMany(
    () => MonnifyAccount,
    (monnifyAccounts: MonnifyAccount) => monnifyAccounts.user,
  )
  public monnifyAccounts: MonnifyAccount[];

  @OneToMany(() => Referral, (referrals: Referral) => referrals.referredBy)
  referrals: Referral[];

  @OneToOne(() => Referral, (referrals: Referral) => referrals.referred)
  referredBy: Referral;

  @OneToMany(() => Withdrawal, (withdrawal: Withdrawal) => withdrawal.user)
  public withdrawals: Withdrawal[];

  @OneToMany(() => Wallet, (wallet: Wallet) => wallet.user)
  public wallets: Wallet[];

  @OneToMany(() => SendTransfer, (transfer: SendTransfer) => transfer.senduser)
  public sentTransfers: SendTransfer[];

  @OneToMany(
    () => ReceiveTransfer,
    (transfer: ReceiveTransfer) => transfer.receiveuser,
  )
  public receivedTransfers: ReceiveTransfer[];

  @OneToMany(
    () => TransferRequest,
    (request: TransferRequest) => request.fromuser,
  )
  public sentRequests: TransferRequest;

  @OneToMany(
    () => TransferRequest,
    (request: TransferRequest) => request.touser,
  )
  public receivedRequests: TransferRequest;

  @OneToMany(
    () => TvSubscriptionActivity,
    (activity: TvSubscriptionActivity) => activity.user,
  )
  public tvSubscriptionActivities: TvSubscriptionActivity;

  @OneToMany(
    () => MobileDataActivity,
    (activity: MobileDataActivity) => activity.user,
  )
  public mobileDataActivities: MobileDataActivity;

  @OneToMany(
    () => ElectricityBillActivity,
    (activity: ElectricityBillActivity) => activity.user,
  )
  public electricityBillActivities: ElectricityBillActivity;

  @OneToMany(
    () => AirtimeActivity,
    (activity: AirtimeActivity) => activity.user,
  )
  public airtimeActivities: AirtimeActivity;
}
