import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { NodemailerService } from 'src/nodemailer/nodemailer.service';
import { UserService } from 'src/user/user.service';
import { generateVerificationCode } from 'src/utils/random-generators';
import { QueryRunner, Repository } from 'typeorm';
import { CreateEmailDto } from './dto/create-email.dto';
import { Email } from './entities/email.entity';

@Injectable()
export class EmailService {
  constructor(
    @InjectRepository(Email) private emailRepository: Repository<Email>,
    private readonly nodeMailerService: NodemailerService,
  ) {}
  async sendMail(options: CreateEmailDto) {
    return await this.nodeMailerService.sendMail(options);
  }

  async sendVerificationCode(email: string, queryRunner?: QueryRunner) {
    const code = await generateVerificationCode();

    const existingCode = await queryRunner.manager.findOne(Email, { email });

    if (existingCode) {
      throw new HttpException(
        'Code already created for email',
        HttpStatus.BAD_REQUEST,
      );
    }
    const mail = await queryRunner.manager.create(Email, {
      email: email,
      emailCode: code,
    });

    await queryRunner.manager.save(Email, mail);

    return await this.sendMail({
      from: 'developer.degoke@gmail.com',
      to: email,
      text: code,
      subject: 'Your TapMoni verification code',
      html: `<section>
      <p>Here is your TapMoni verification code</p>
      <br />
      <p><strong>${code}</strong></p>
      </section>`,
    });
  }

  async verifyMail(code, email) {
    try {
      const data = await this.emailRepository.findOne({ email });

      if (!data) {
        throw new HttpException('Invalid Email', HttpStatus.BAD_REQUEST);
      }

      if (data.emailCode !== code) {
        throw new HttpException('Invalid code', HttpStatus.BAD_REQUEST);
      }

      await this.deleteCode(email);
    } catch (error) {
      throw error;
    }
  }

  async deleteCode(email) {
    return await this.emailRepository.delete({ email });
  }

  async findAll() {
    return await this.emailRepository.find();
  }
}
