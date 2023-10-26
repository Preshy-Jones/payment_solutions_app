import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Connection, Not, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { SmsService } from 'src/sms/sms.service';
import { ConfigService } from '@nestjs/config';
import { EmailService } from 'src/email/email.service';
import { object } from 'joi';
import { AuthService } from 'src/auth/auth.service';
import { ReferralService } from 'src/referral/referral.service';
import {
  AdminRoles,
  ADMIN_ROLES,
  UserRoles,
  USER_ROLES,
} from 'src/common/types/roles.type';
import { CustomerRepository } from './repositories/customer.repository';
import { AdminRepository } from './repositories/admin.repository';
import { CustomerKycRepository } from './repositories/customer-kyc.repository';
import { WALLET_TYPES } from 'src/common/types/wallet.type';
import { CURRENCY } from 'src/common/types/currency.type';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import { Customer } from './entities/customer.entity';
import { CustomerKyc } from './entities/customer-kyc.entity';
import { Referral } from 'src/referral/entities/referral.entity';
import { Administrator } from './entities/administrator.entity';
import { CreateAdminDto } from './dto/create-admin.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(CustomerRepository)
    private customerRepository: CustomerRepository,
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    @InjectRepository(CustomerKycRepository)
    private customerKycRepository: CustomerKycRepository,
    private readonly smsService: SmsService,
    private readonly configService: ConfigService,
    private readonly emailService: EmailService,
    private connection: Connection,
  ) {}

  async find() {
    try {
      return await this.customerRepository
        .find
        //{relations: ['wallets'],}
        ();
    } catch (error) {
      throw error;
    }
  }

  async findByEmail(email: string) {
    try {
      const customer = await this.customerRepository.findByEmail(email);

      if (customer) {
        return {
          user: customer,
          role: USER_ROLES.CUSTOMER,
        };
      }

      const admin = await this.adminRepository.findByEmail(email);

      if (admin) {
        return {
          user: admin,
          role: USER_ROLES.ADMIN,
        };
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async findById(id: number) {
    try {
      const customer = await this.customerRepository.findById(id);

      if (customer) {
        return {
          user: customer,
          role: USER_ROLES.CUSTOMER,
        };
      }

      const admin = await this.adminRepository.findById(id);

      if (admin) {
        return {
          user: admin,
          role: USER_ROLES.ADMIN,
        };
      }

      return null;
    } catch (error) {
      throw error;
    }
  }

  async findCustomerForJwt(id: number) {
    return await this.customerRepository.findOne(id, {
      relations: ['wallets'],
    });
  }

  async findAdminForJwt(id: number) {
    return await this.adminRepository.findOne(id);
  }

  async createCustomer(createUserDto: CreateUserDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const { email, phoneNumber, referralCode } = createUserDto;

      const emailAlreadyExists = await this.customerRepository.findByEmail(
        email,
      );

      if (emailAlreadyExists) {
        throw new HttpException('Email Already in use', HttpStatus.CONFLICT);
      }

      const phoneNumberAlreadyExists =
        await this.customerRepository.findByPhoneNumber(phoneNumber);

      if (phoneNumberAlreadyExists) {
        throw new HttpException(
          'Phone Number Already in use',
          HttpStatus.CONFLICT,
        );
      }

      let referrerId;

      if (referralCode) {
        const { data } = await this.verifyReferralCode(referralCode);

        referrerId = data.user.id;
      }

      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);

      const code = await this.createReferralCode(createUserDto.firstName);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newUser = await queryRunner.manager.create(Customer, {
          ...createUserDto,
          password: hashedPassword,
          referralCode: code,
        });

        const savedUser = await queryRunner.manager.save(Customer, newUser);

        const wallet = await queryRunner.manager.create(Wallet, {
          userId: savedUser.id,
          type: WALLET_TYPES.NAIRA,
          currency: CURRENCY.NAIRA,
          balance: 1000000,
        });

        await queryRunner.manager.save(Wallet, wallet);

        const newKyc = await queryRunner.manager.create(CustomerKyc, {
          userId: savedUser.id,
        });

        await queryRunner.manager.save(CustomerKyc, newKyc);

        if (referralCode) {
          const newReferral = await queryRunner.manager.create(Referral, {
            referredById: referrerId,
            referredId: savedUser.id,
          });

          await queryRunner.manager.save(newReferral);
        }

        /*await this.emailService.sendVerificationCode(
          newUser.email,
          queryRunner,
        );*/
        await queryRunner.commitTransaction();
        return {
          message: 'User Created Successfully',
          data: {
            user: savedUser,
          },
        };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto) {
    const queryRunner = this.connection.createQueryRunner();
    try {
      const { email, phoneNumber } = createAdminDto;

      const emailAlreadyExists = await this.adminRepository.findByEmail(email);

      if (emailAlreadyExists) {
        throw new HttpException('Email Already in use', HttpStatus.CONFLICT);
      }
      const phoneNumberAlreadyExists =
        await this.adminRepository.findByPhoneNumber(phoneNumber);

      if (phoneNumberAlreadyExists) {
        throw new HttpException(
          'Phone Number Already in use',
          HttpStatus.CONFLICT,
        );
      }
      const hashedPassword = await bcrypt.hash(createAdminDto.password, 10);

      await queryRunner.connect();
      await queryRunner.startTransaction();

      try {
        const newUser = await queryRunner.manager.create(Administrator, {
          ...createAdminDto,
          password: hashedPassword,
        });

        const savedAdmin = await queryRunner.manager.save(
          Administrator,
          newUser,
        );

        await queryRunner.commitTransaction();
        return {
          message: 'Admin Created Successfully',
          data: {
            admin: savedAdmin,
          },
        };
      } catch (error) {
        await queryRunner.rollbackTransaction();
        throw error;
      }
    } catch (error) {
      throw error;
    }
  }
  // async createAdmin(payload: CreateAdminDto) {
  //   try {
  //     const { email } = payload;

  //     const emailAlreadyExists = await this.adminRepository.findByEmail(email);

  //     if (emailAlreadyExists) {
  //       throw new HttpException('Email Already in use', HttpStatus.CONFLICT);
  //     }

  //     const newAdmin = await this.adminRepository.create(payload);
  //     return await this.adminRepository.save(newAdmin);
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async verifyReferralCode(referralCode: string) {
    try {
      const user = await this.customerRepository.findByReferralCode(
        referralCode,
      );
      if (!user) {
        throw new HttpException('Invalid referralCode', HttpStatus.BAD_REQUEST);
      }
      return {
        message: 'Referral code verified successfully',
        data: {
          user,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async createReferralCode(firstName) {
    try {
      const hash = await crypto.randomBytes(4).toString('hex').substring(0, 3);
      return `TAP_${firstName}${hash}`;
    } catch (error) {
      throw error;
    }
  }

  async setPin(email: string, pin: number) {
    try {
      const hashedPin = await bcrypt.hash(String(pin), 10);
      return await this.customerRepository.update(
        { email },
        { pin: hashedPin },
      );
    } catch (error) {
      throw error;
    }
  }

  async getTotalNumberOfUsers() {
    try {
      const totalUsers = await this.customerRepository.count();

      return { totalUsers };
    } catch (error) {
      throw error;
    }
  }

  async findBvnByUserId(id: number) {
    try {
      const { bvn } = await this.customerKycRepository.findOne({ userId: id });

      return bvn;
    } catch (error) {
      throw error;
    }
  }

  async findKycByUserId(id: number) {
    try {
      const kyc = await this.customerKycRepository.findOne({ userId: id });

      return kyc;
    } catch (error) {
      throw error;
    }
  }

  /*
  async findByEmail(email: string): Promise<ReturnTypeContainer<any>> {
    try {
      const user = await this.userRepository.findOne(
        { email },
        {
          relations: [
            'wallet',
            'transfers',
            'transactions',
            'accounts',
            'airtimeActivities',
            'mobileDataActivities',
            'electricityActivities',
            'tvSubscriptionActivities',
          ],
        },
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'na GOKE DO AM 0',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async findById(id: number) {
    try {
      return await this.userRepository.findOne(id, {
        relations: [
          'wallet',
          'transfers',
          'transactions',
          'accounts',
          'airtimeActivities',
          'kyc',
        ],
      });
    } catch (error) {
      throw error;
    }
  }
  async find() {
    try {
      return await this.userRepository.find({
        relations: ['wallet', 'accounts', 'transactions', 'transfers'],
      });
    } catch (error) {
      throw error;
    }
  }
  async findByPhone(phoneNumber: string): Promise<ReturnTypeContainer<any>> {
    try {
      const user = await this.userRepository.findOne(
        { phoneNumber },
        {
          relations: ['wallet'],
        },
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'SUCCESS',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async findByFirstName(firstName: string): Promise<ReturnTypeContainer<any>> {
    try {
      const user = await this.userRepository.findOne(
        { firstName },
        {
          relations: ['wallet'],
        },
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'SUCCESS',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async findByLastName(lastName: string): Promise<ReturnTypeContainer<any>> {
    try {
      const user = await this.userRepository.findOne(
        { lastName },
        {
          relations: ['wallet'],
        },
      );
      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return {
        message: 'SUCCESS',
        data: user,
      };
    } catch (error) {
      throw error;
    }
  }
  async getByEmail(email) {
    return await this.userRepository.findOne({ email });
  }
  async createReferralCode(firstName) {
    try {
      const hash = await crypto.randomBytes(4).toString('hex').substring(0, 3);
      return `${firstName}${hash}`;
    } catch (error) {
      throw error;
    }
  }
  // add to kyc
  /*async markPhonenumberAsConfirmed(id) {
    try {
      return this.userRepository.update(id, {
        isPhoneNumberVerified: true,
      });
    } catch (error) {}
  }
  async markEmailAsConfirmed(email) {
    try {
      return this.userRepository.update(
        { email },
        {
          isEmailVerified: true,
        },
      );
    } catch (error) {
      throw error;
    }
  }
  async verifyEmail(code, email) {
    try {
      await this.emailService.verifyMail(code, email);
      await this.markEmailAsConfirmed(email);
      return {
        message: 'Email Verified Successfully',
      };
    } catch (error) {}
  }
  async initiatePhoneNumberVerification(phoneNumber: string) {
    try {
      return this.smsService.sendPhoneNumberOtp(phoneNumber);
    } catch (error) {
      throw error;
    }
  }
  async verifyPhoneNumberOtp(
    phoneNumber: string,
    verificationCode: string,
    id: number,
  ) {
    try {
      const data = await this.smsService.verifyPhoneNumberOtp(
        phoneNumber,
        verificationCode,
      );
      await this.markPhonenumberAsConfirmed(id);
      return data;
    } catch (error) {
      throw error;
    }
  }
  
  async delete(id) {
    return this.userRepository.delete(id);
  }
  async setPin(email: string, pin: number) {
    const hashedPin = await bcrypt.hash(String(pin), 10);
    return await this.userRepository.update({ email }, { pin: hashedPin });
  }
  async verifyReferralCode(referralCode: string) {
    try {
      const user = await this.userRepository.findOne({ referralCode });
      if (!user) {
        throw new HttpException('Invalid referralCode', HttpStatus.BAD_REQUEST);
      }
      return user.id;
    } catch (error) {
      throw error;
    }
  }
  async markAsAdmin(email: string, role: AdminRoles) {
    try {
      await this.userRepository.update({ email }, { role });
    } catch (error) {
      throw error;
    }
  }
  }*/
}
