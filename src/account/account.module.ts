import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FlutterwaveModule } from 'src/flutterwave/flutterwave.module';
import { MonnifyModule } from 'src/monnify/monnify.module';
import { MonnifyAccountRepository } from './repositories/monnify-account.repository';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([MonnifyAccountRepository]),
    FlutterwaveModule,
    MonnifyModule,
    UserModule,
  ],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
