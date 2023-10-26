import { CacheInterceptor, CacheModule, Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { WalletModule } from './wallet/wallet.module';
import { AccountModule } from './account/account.module';
import { TransactionsModule } from './transactions/transactions.module';
import { TransfersModule } from './transfers/transfers.module';
import { SmsModule } from './sms/sms.module';
import { PaystackModule } from './paystack/paystack.module';
import { VtpassModule } from './vtpass/vtpass.module';
import { BankModule } from './bank/bank.module';
import { FlutterwaveModule } from './flutterwave/flutterwave.module';
import { SettingsModule } from './settings/settings.module';
import { AdminModule } from './admin/admin.module';
import { TwillioModule } from './twillio/twillio.module';
import { LogModule } from './log/log.module';
import { HealthModule } from './health/health.module';
import { MonnifyModule } from './monnify/monnify.module';
import * as Joi from 'joi';
import * as redisStore from 'cache-manager-redis-store';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { EmailModule } from './email/email.module';
import { NodemailerModule } from './nodemailer/nodemailer.module';
import { ReferralModule } from './referral/referral.module';
import { AbilityModule } from './ability/ability.module';
import { AbilitiesGuard } from './ability/abilities.guard';
import { JwtAuthGaurd } from './common/gaurds/jwt-auth.gaurd';
import { AnnouncementModule } from './announcement/announcement.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB_PORT: Joi.number().required(),
        POSTGRES_DB_HOST: Joi.string().required(),
        PGADMIN_DEFAULT_EMAIL: Joi.string().required(),
        PGADMIN_DEFAULT_PASSWORD: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRATION: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.string().required(),
      }),
    }),
    CacheModule.register({
      store: redisStore,
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT,
      password: process.env.REDIS_PASSWORD,
      ttl: 1200,
      isGlobal: true,
      tls: {
        rejectUnauthorized: false,
      },
    }),
    AuthModule,
    UserModule,
    DatabaseModule,
    WalletModule,
    AccountModule,
    TransactionsModule,
    TransfersModule,
    SmsModule,
    PaystackModule,
    VtpassModule,
    BankModule,
    FlutterwaveModule,
    SettingsModule,
    AdminModule,
    TwillioModule,
    LogModule,
    HealthModule,
    MonnifyModule,
    EmailModule,
    NodemailerModule,
    ReferralModule,
    AbilityModule,
    AnnouncementModule,
    ActivitiesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGaurd,
    },
    {
      provide: APP_GUARD,
      useClass: AbilitiesGuard,
    },
  ],
})
export class AppModule {}
