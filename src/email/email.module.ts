import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NodemailerModule } from 'src/nodemailer/nodemailer.module';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UserModule } from 'src/user/user.module';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import { Email } from './entities/email.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Email]), NodemailerModule],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService],
})
export class EmailModule {}
