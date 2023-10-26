import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwillioService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILLIO_ACCOUNT_SID');
    const authToken = configService.get('TWILLIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(phoneNumber: string) {
    try {
      const serviceSid = this.configService.get<string>(
        'TWILLIO_MESSAGING_SERVICE_SID',
      );

      return await this.twilioClient.verify
        .services(serviceSid)
        .verifications.create({ to: phoneNumber, channel: 'sms' });
    } catch (err) {
      throw err;
    }
  }

  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    try {
      const serviceSid = this.configService.get<string>(
        'TWILLIO_MESSAGING_SERVICE_SID',
      );

      const result = await this.twilioClient.verify
        .services(serviceSid)
        .verificationChecks.create({ to: phoneNumber, code: verificationCode });

      if (!result.valid || result.status !== 'approved') {
        throw new BadRequestException('Invalid code');
      }
    } catch (error) {
      throw error;
    }
  }

  async sendMessage(to: string, body: string) {
    const phoneNumber = this.configService.get<string>('TWILLIO_PHONE_NUMBER');
    try {
      await this.twilioClient.messages.create({
        to,
        from: phoneNumber,
        body: body,
      });
    } catch (error) {
      throw error;
    }
  }
}
