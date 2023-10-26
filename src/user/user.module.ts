import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionsModule } from 'src/transactions/transactions.module';
import { SmsModule } from 'src/sms/sms.module';
import { EmailModule } from 'src/email/email.module';
import { ReferralModule } from 'src/referral/referral.module';
import { AbilityModule } from 'src/ability/ability.module';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerKycRepository } from './repositories/customer-kyc.repository';
import { AdminRepository } from './repositories/admin.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CustomerRepository,
      AdminRepository,
      CustomerKycRepository,
    ]),
    TransactionsModule,
    SmsModule,
    EmailModule,
    ReferralModule,
    AbilityModule,
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
