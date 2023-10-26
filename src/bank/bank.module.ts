import { Module } from '@nestjs/common';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';
import { SettingsModule } from 'src/settings/settings.module';
import { FlutterwaveModule } from 'src/flutterwave/flutterwave.module';
import { MonnifyModule } from 'src/monnify/monnify.module';

@Module({
  imports: [SettingsModule, FlutterwaveModule, MonnifyModule],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
