import { forwardRef, Module } from '@nestjs/common';
import { SmsService } from './sms.service';
import { SmsController } from './sms.controller';
import { UserModule } from 'src/user/user.module';
import { TwillioModule } from 'src/twillio/twillio.module';

@Module({
  imports: [TwillioModule],
  controllers: [SmsController],
  providers: [SmsService],
  exports: [SmsService],
})
export class SmsModule {}
