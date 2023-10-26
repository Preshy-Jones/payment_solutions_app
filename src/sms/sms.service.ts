import {
  BadRequestException,
  forwardRef,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TwillioService } from 'src/twillio/twillio.service';
import { UserService } from 'src/user/user.service';
import { Twilio } from 'twilio';

@Injectable()
export class SmsService {
  constructor(private readonly twillioService: TwillioService) {}

  async sendPhoneNumberOtp(phoneNumber: string) {
    try {
      return await this.twillioService.initiatePhoneNumberVerification(
        phoneNumber,
      );
    } catch (error) {
      throw error;
    }
  }

  async verifyPhoneNumberOtp(phoneNumber: string, verificationCode: string) {
    try {
      return await this.twillioService.confirmPhoneNumber(
        phoneNumber,
        verificationCode,
      );
    } catch (error) {
      throw error;
    }
  }
}
