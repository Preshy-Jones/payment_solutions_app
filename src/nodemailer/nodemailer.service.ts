import { Injectable } from '@nestjs/common';
import { createTransport, createTestAccount } from 'nodemailer';
import * as Mail from 'nodemailer/lib/mailer';

@Injectable()
export class NodemailerService {
  private nodemailerTransport: Mail;
  constructor() {
    this.nodemailerTransport = createTransport({
      service: 'gmail',
      auth: {
        user: 'developer.degoke@gmail.com',
        pass: 'dev_email_password',
      },
    });
  }

  async sendMail(options: Mail.Options) {
    try {
      return await this.nodemailerTransport.sendMail(options);
    } catch (error) {
      throw error;
    }
  }
}
