import { Injectable, forwardRef, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { number } from 'joi';
import { ReturnTypeContainer } from 'src/common/containers/Container.entity';
import { WALLET_TYPES } from 'src/common/types/wallet.type';
import { Transaction } from 'src/transactions/entities/transaction.entity';
import { UserService } from 'src/user/user.service';
import { QueryRunner, Repository } from 'typeorm';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { TransactionDto } from './dto/transaction.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { Wallet } from './entities/wallet.entity';
import { WalletRepository } from './repositories/wallet.repository';

@Injectable()
export class WalletService {
  constructor(
    @InjectRepository(WalletRepository)
    private walletRepository: WalletRepository,
  ) {}
  async create(createWalletDto: CreateWalletDto) {
    try {
      const newWallet = await this.walletRepository.create(createWalletDto);

      await this.walletRepository.save(newWallet);

      return newWallet;
    } catch (error) {
      throw error;
    }
  }

  // async deposit(
  //   transactionDto: TransactionDto,
  // ): Promise<ReturnTypeContainer<any>> {
  //   const { email, amount } = transactionDto;
  //   // return {
  //   //   message: 'hello',
  //   //   data: transactionDto,
  //   // };

  //   try {
  //     const { id: walletId } = await this.walletRepository.findByUserEmail(
  //       email,
  //     );
  //     await this.walletRepository.increment(
  //       { id: walletId },
  //       'balance',
  //       amount,
  //     );
  //     const wallet = await this.walletRepository.findOne({ id: walletId });
  //     return {
  //       message: 'success',
  //       data: { balance: wallet.balance },
  //     };
  //   } catch (error) {
  //     throw error;
  //   }
  // }

  async removeMoney(
    transactionDto: TransactionDto,
    queryRunner: QueryRunner,
  ): Promise<ReturnTypeContainer<any>> {
    const { walletId, amount } = transactionDto;
    try {
      // const { id: walletId } = await this.walletRepository.findByUserEmail(
      //   email,
      // );
      // const user = await this.userService.findByEmail(email);
      //   const walletId = user.data.wallet.id;
      // await this.walletRepository.decrement(
      //   { id: walletId },
      //   'balance',
      //   amount,
      // );
      await queryRunner.manager.decrement(
        Wallet,
        { id: walletId },
        'balance',
        amount,
      );
      const wallet = await queryRunner.manager.findOne(Wallet, {
        id: walletId,
      });
      return {
        message: 'success',
        data: { balance: wallet.balance },
      };
    } catch (error) {
      throw error;
    }
  }

  async find() {
    return await this.walletRepository.find();
  }

  async findById(id: number) {
    return await this.walletRepository.findOne(id);
  }

  async getWalletByOwnerId(id: number) {
    try {
      return await this.walletRepository.findOne({
        relations: ['owner'],
        where: {
          owner: {
            id: id,
          },
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async getTotalUsersNaira() {
    try {
      const { sum } = await this.walletRepository
        .createQueryBuilder('wallet')
        .select('SUM(wallet.balance)', 'sum')
        .where('wallet.type = :type', { type: WALLET_TYPES.NAIRA })
        .getRawOne();

      return {
        totalUsersNaira: sum,
      };
    } catch (error) {
      throw error;
    }
  }
}
