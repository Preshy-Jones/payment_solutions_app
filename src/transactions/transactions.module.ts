import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpModule } from '@nestjs/axios';
import { PaystackModule } from '../paystack/paystack.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { MonnifyModule } from 'src/monnify/monnify.module';
import { FlutterwaveModule } from 'src/flutterwave/flutterwave.module';
import { SettingsModule } from 'src/settings/settings.module';
import { WithdrawalRepository } from './repositories/withdrawal.repository';
import { DepositRepository } from './repositories/deposit.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WithdrawalRepository, DepositRepository]),
    HttpModule,
    PaystackModule,
    WalletModule,
    FlutterwaveModule,
    MonnifyModule,
    SettingsModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService],
  exports: [TransactionsService],
})
export class TransactionsModule {}
