import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map, lastValueFrom, catchError } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { PaystackService } from 'src/paystack/paystack.service';
import { WalletService } from 'src/wallet/wallet.service';
import { Connection, Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { UserService } from 'src/user/user.service';
import { MonnifyService } from 'src/monnify/monnify.service';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
import { SettingsModule } from 'src/settings/settings.module';
import {
  BankServices,
  BANK_SERVICES,
  Services,
} from 'src/common/types/service.type';
import { ServicesSettings } from 'src/common/types/settings.type';
import { Cache } from 'cache-manager';
import { SettingsService } from 'src/settings/settings.service';
import { CreateVirtualAccountDto } from './dto/create-virtual-account.dto';
import { CreateReservedAccountDto } from 'src/flutterwave/dto/create-reserved-account.dto';
import { FWWithdrawalDto } from './dto/withdrawal.dto';
import { getTransactionReference } from 'src/utils/random-generators';

import { userInfo } from 'os';
import { CURRENCY } from 'src/common/types/currency.type';
import { InitiateMNTransferDto } from 'src/monnify/dto/initiate-transfer.dto';
import { Withdrawal } from './entities/withdrawal.entity';
import {
  TRANSACTION_STATUS,
  TransactionStatus,
} from 'src/common/types/status.type';
import { TRANSACTION } from 'src/common/types/transaction.type';
import { User } from 'src/user/entities/user.entity';
import { WithdrawalRepository } from './repositories/withdrawal.repository';
import { DepositRepository } from './repositories/deposit.repository';

const { FLUTTERWAVE, MONNIFY } = BANK_SERVICES;

const { WITHDRAWAL, DEPOSIT } = TRANSACTION;

@Injectable()
export class TransactionsService {
  private currentService: BankServices = MONNIFY;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private connection: Connection,
    @InjectRepository(WithdrawalRepository)
    private withdrawalRepository: WithdrawalRepository,
    @InjectRepository(DepositRepository)
    private depositRepository: DepositRepository,
    private readonly paystackService: PaystackService,
    private readonly walletService: WalletService,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly monnifyService: MonnifyService,
    private readonly settingsService: SettingsService,
  ) {}

  // async initiateWithdrawal(dto: FWWithdrawalDto, user: User) {
  //   /*if (user.wallet[0].balance < dto.amount) {
  //     throw new HttpException('Insufficient balance', HttpStatus.BAD_REQUEST);
  //   }*/
  //   const queryRunner = this.connection.createQueryRunner();
  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();
  //   try {
  //     const reference = await getTransactionReference();
  //     const mockReferencePass = 'dfs23fhr7ntg0293039_PMCKDU_1';
  //     const mockReferenceFail = 'dfs23fhr7ntg0293039_PMCK_ST_FDU_1';
  //     const narration = 'Tapmoney Withdrawal';

  //     let payload;
  //     let newTransaction;
  //     let result;

  //     if (this.currentService === FLUTTERWAVE) {
  //       payload = {
  //         ...dto,
  //         reference: mockReferencePass,
  //         narration,
  //       };
  //     }

  //     if (this.currentService === MONNIFY) {
  //       payload = {
  //         amount: dto.amount,
  //         reference,
  //         narration,
  //         destinationBankCode: dto.account_bank,
  //         destinationAccountNumber: dto.account_number,
  //         currency: dto.currency,
  //       };

  //       try {
  //         newTransaction = await queryRunner.manager.create(Withdrawal, {
  //           accountBank: dto.account_bank,
  //           accountNumber: dto.account_number,
  //           amount: dto.amount,
  //           currency: dto.currency,
  //           reference,
  //           userId: user.id,
  //           status: TRANSACTION_STATUS.QUEUED,
  //           type: TRANSACTION.WITHDRAWAL,
  //           serviceUsed: this.currentService,
  //           walletId: dto.wallet_id,
  //         });

  //         await queryRunner.manager.save(Withdrawal, newTransaction);

  //         //might change
  //         await this.walletService.removeMoney(
  //           { email: user.email, amount: dto.amount },
  //           queryRunner,
  //         );

  //         result = await this.monnifyService.initiateTransfers(payload);

  //         await queryRunner.commitTransaction();
  //       } catch (error) {
  //         await queryRunner.rollbackTransaction();
  //         throw error;
  //       }
  //       await this.withdrawalRepository.update(
  //         { reference },
  //         { status: result.status },
  //       );
  //     }

  //     /*if (service === FLUTTERWAVE) {
  //       result = await this.flutterwaveService.transfer(payload);

  //       if (result.status === 'success') {
  //         await this.walletService.removeMoney(
  //           { email: user.email, amount: dto.amount },
  //           queryRunner,
  //         );
  //         await queryRunner.manager.update(
  //           Transaction,
  //           { reference },
  //           { status: TRANSACTIONSTATUS.PENDING, merchantId: result.data.id },
  //         );

  //         await queryRunner.commitTransaction();
  //         return {
  //           message: result.message,
  //         };
  //       } else if (result.status === 'error') {
  //         throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
  //       } else {
  //         await queryRunner.manager.update(
  //           Transaction,
  //           { reference },
  //           { status: TRANSACTIONSTATUS.FAILED, id: result.data.id },
  //         );
  //         await queryRunner.commitTransaction();
  //         return {
  //           status: 404,
  //           message: result.message,
  //         };
  //       }
  //     }*/
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async getTransactionStatus(reference: string | number) {
    try {
      let result;
      if (this.currentService === MONNIFY) {
        result = await this.monnifyService.getTransactionStatus(
          <string>reference,
        );

        return await this.withdrawalRepository.update(
          { reference: <string>reference },
          {
            status: result.status,
            bankName: result.data.destinationBankName,
            accountName: result.data.destinationAccountName,
            merchantReference: result.data.transactionReference,
          },
        );
      }

      /*if (service === FLUTTERWAVE) {
        result = await this.flutterwaveService.getTransferStatus(
          <number>reference,
        );

        if (result.status !== 'success') {
          throw new HttpException(result.message, HttpStatus.BAD_REQUEST);
        }
        if (result.data.status === 'SUCCESSFUL') {
          await this.transactionRepository.update(
            { merchantId: <number>reference },
            { status: TRANSACTIONSTATUS.COMPLETED },
          );
          return {
            message: result.data.complete_message,
            status: result.data.status,
          };
        }

        if (result.status === 'PENDING') {
          return {
            message: result.data.complete_message,
            status: result.data.status,
          };
        }

        if (result.status === 'FAILED') {
          await this.transactionRepository.update(
            { merchantId: <number>reference },
            { status: TRANSACTIONSTATUS.FAILED },
          );
          return {
            message: result.data.complete_message,
            status: result.data.status,
          };
        }
      }*/
    } catch (error) {
      throw error;
    }
  }

  async updateTransactionStatus(
    reference: number | string,
    status: TransactionStatus,
  ) {
    try {
      if (this.currentService === MONNIFY) {
        return await this.withdrawalRepository.update(
          { merchantId: <number>reference },
          { status },
        );
      }

      if (this.currentService === FLUTTERWAVE) {
        await this.withdrawalRepository.update(
          { reference: <string>reference },
          { status },
        );
      }
    } catch (error) {
      throw error;
    }
  }

  async getTotalWithdrawalsBalance() {
    try {
      const sum = await this.withdrawalRepository.count({
        currency: CURRENCY.NAIRA,
      });

      return {
        totalWithdrawals: sum,
      };
    } catch (error) {
      throw error;
    }
  }

  async getTotalDepositsBalance() {
    try {
      const sum = await this.depositRepository.count({
        currency: CURRENCY.NAIRA,
      });

      return {
        totalDeposits: sum,
      };
    } catch (error) {
      throw error;
    }
  }

  async getAllTransactions(type) {
    try {
      switch (type) {
        case 'all':
          const depositsQuery = await this.depositRepository
            .createQueryBuilder('deposit')
            .select('deposit')
            .leftJoinAndSelect('deposit.user', 'user')
            .leftJoinAndSelect('deposit.wallet', 'wallet')
            .getQuery();
          const withdrawalQuery = await this.withdrawalRepository
            .createQueryBuilder('withdrawal')
            .select('withdrawal')
            .leftJoinAndSelect('withdrawal.user', 'user')
            .leftJoinAndSelect('withdrawal.wallet', 'wallet')
            .getQuery();

          const allTransactions = await this.connection.manager.query(
            `${depositsQuery} UNION ${withdrawalQuery}`,
          );

          return {
            message: 'Success',
            data: {
              transactions: allTransactions,
            },
          };

        case WITHDRAWAL:
          const withdrawals = await this.withdrawalRepository.find({
            relations: ['user', 'wallet'],
          });
          return {
            message: 'Success',
            data: {
              withdrawals,
            },
          };

        case DEPOSIT:
          const deposits = await this.depositRepository.find({
            relations: ['user', 'wallet'],
          });
          return {
            message: 'Success',
            data: {
              deposits,
            },
          };
      }
    } catch (error) {
      throw error;
    }
  }

  async getUserTransactions(id: number, type) {
    try {
      switch (type) {
        case 'all':
          const depositsQuery = await this.depositRepository
            .createQueryBuilder('deposit')
            .leftJoinAndSelect('deposit.user', 'user')
            .leftJoinAndSelect('deposit.wallet', 'wallet')
            .where(`user.id = ${id}`)
            .getQuery();
          const withdrawalQuery = await this.withdrawalRepository
            .createQueryBuilder('withdrawal')
            .leftJoinAndSelect('withdrawal.user', 'user')
            .leftJoinAndSelect('withdrawal.wallet', 'wallet')
            .where(`user.id = ${id}`)
            .getQuery();

          const allTransactions = await this.connection.manager.query(
            `${depositsQuery} UNION ${withdrawalQuery}`,
          );

          return {
            message: 'Success',
            data: {
              transactions: allTransactions,
            },
          };

        case WITHDRAWAL:
          const withdrawals = await this.withdrawalRepository.findOne(id, {
            relations: ['user', 'wallet'],
          });
          return {
            message: 'Success',
            data: {
              withdrawals,
            },
          };

        case DEPOSIT:
          const deposits = await this.depositRepository.findOne(id, {
            relations: ['user', 'wallet'],
          });
          return {
            message: 'Success',
            data: {
              deposits,
            },
          };
      }
    } catch (error) {
      throw error;
    }
  }

  async findOneTransaction(id: number) {
    try {
      const withdrawal = await this.withdrawalRepository.findOne(id);
      if (withdrawal) {
        return {
          message: 'Success',
          data: {
            withdrawal,
          },
        };
      }
      const deposit = await this.depositRepository.findOne(id);
      if (deposit) {
        return {
          message: 'Success',
          data: {
            deposit,
          },
        };
      }

      throw new HttpException('Transaction not found', HttpStatus.NOT_FOUND);
    } catch (error) {
      throw error;
    }
  }

  /*async getTotalNairaDepositsBalance() {
    try {
      const { sum } = await this.transactionRepository
        .createQueryBuilder('transaction')
        .select('SUM(transaction.amount)', 'sum')
        .where('transaction.currency = :currency', {
          currency: CURRENCY.NAIRA,
        })
        .andWhere('transaction.type = :type', { type: TRANSACTION.DEPOSIT })
        .getRawOne();

      return {
        totalNairaDeposits: sum,
      };
    } catch (error) {
      throw error;
    }
  }


  async getUserTransactions(id: number, type?: TransactionType) {
    try {
      if (type) {
        return await this.transactionRepository.find({ userId: id });
      }
      return await this.transactionRepository.find({ userId: id, type });
    } catch (error) {
      throw error;
    }
  }

  async findOneTransaction(id: number) {
    try {
      return await this.transactionRepository.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  // create callback url/webhooks
  // add server sent events
  //  admin refetch transaction
  // admin retry a transaction
  // admin update transaction details
  // transaction with same amount and bank(similar transactions) with created at 10 minutes ago will not be valid

  /*async getCurrentService() {
    let data;
    data = await this.cacheManager.get<any>(
      ServicesSettings.TRANSACTIONS_SERVICE,
    );

    if (!data) {
      data = await this.settingsService.getSetting(
        ServicesSettings.TRANSACTIONS_SERVICE,
      );
    }

    if (!data) {
      throw new HttpException(
        'Service currently unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const status = data.isActive;

    if (!status) {
      throw new HttpException(
        'Service currently unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    const service = data.value;

    switch (service) {
      case Services.FLUTTERWAVE:
        this.currentService = this.flutterwaveService;
        break;
      case Services.MONNIFY:
        this.currentService = this.monnifyService;
    }
  }

  async createVirtualAccount(createVirtualAccountDto: CreateVirtualAccountDto) {
    const flutterwaveData: CreateReservedAccountDto = {
      email: createVirtualAccountDto.customerEmail,
      tx_ref: createVirtualAccountDto.accountRecference,
      bvn: createVirtualAccountDto.bvn,
      is_permanent: true,
    };

    const monnifyData = removeKeyAndPropertyFromObject(
      createVirtualAccountDto,
      ['tx_ref'],
    );
    try {
      await this.getCurrentService();

      let result;

      switch (this.currentService) {
        case this.flutterwaveService:
          result = await this.currentService.createReservedAccount(
            flutterwaveData,
          );
          break;
        case this.monnifyService:
          result = await this.currentService.createReservedAccount(monnifyData);
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  async withdraw(withdrawalDto: WithdrawalDto) {
    try {
      await this.monnifyService.initiateTransfers(withdrawalDto);
    } catch (error) {
      throw error;
    }
  }

  /*async completeDeposit(reference: string, user: User) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const transactionStatus = await this.paystackService.verifyTransaction(
        reference,
      );

      if (transactionStatus['data']['status'] === 'success') {
        const email = transactionStatus['data']['customer']['email'];
        const { amount } = transactionStatus['data'];
        const transactionDto = { email, amount };
        const response = await this.walletService.deposit(transactionDto);
        const deposit = new Transaction();
        deposit.amount = amount;
        deposit.balance = response.data.balance;
        deposit.user = user;
        deposit.type = 'deposit';
        deposit.remarks = `Paystack Deposit`;
        await queryRunner.manager.save(deposit);
      }
      await queryRunner.commitTransaction();
      return {
        message: 'Deposit completed successfully',
      };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();

      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }*/
}
