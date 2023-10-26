import {
  Injectable,
  HttpStatus,
  HttpException,
  CACHE_MANAGER,
  Inject,
} from '@nestjs/common';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Connection } from 'typeorm';
import { Transfer } from './entities/transfer.entity';
import { UserService } from '../user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { ReturnTypeContainer } from 'src/common/containers/Container.entity';
import { ReceiveTransferRepository } from './repositories/receive-transfer.repository';
import { SendTransferRepository } from './repositories/send-transfer.repository';
import { TransferRequestRepository } from './repositories/transfer-request.repository';
import { ReceiveTransfer } from './entities/receive-transfer.entity';
import { SendTransfer } from './entities/send-transfer.entity';
import { Wallet } from 'src/wallet/entities/wallet.entity';
import {
  TRANSACTION_STATUS,
  TRANSFER_REQUEST_STATUS,
} from 'src/common/types/status.type';
import { Cache } from 'cache-manager';
import { CURRENCY } from 'src/common/types/currency.type';
import { TransferRequest } from './entities/transfer-requests.entity';
import { CreateTransferRequestDto } from './dto/create-transfer-request.dto';
import { HandleTransferRequestDto } from './dto/handle-transfer-request.dto';

@Injectable()
export class TransfersService {
  constructor(
    private connection: Connection,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    @InjectRepository(ReceiveTransferRepository)
    private receiveTransferRepository: ReceiveTransferRepository,
    @InjectRepository(SendTransferRepository)
    private sendTransferRepository: SendTransferRepository,
    @InjectRepository(TransferRequestRepository)
    private transferrequestRepository: TransferRequestRepository,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
  ) {}

  async transferFunds(
    createTransferDto: CreateTransferDto, //: Promise<ReturnTypeContainer<string>>
  ) {
    const queryRunner = this.connection.createQueryRunner();

    const { recipientEmail, senderEmail, amount } = createTransferDto;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recipient = await this.userService.findByEmail(recipientEmail);
      const sender = await this.userService.findByEmail(senderEmail);

      const recipientWalletId = recipient.user['wallets'][0].id;
      const senderWalletId = sender.user['wallets'][0].id;

      const recipientWallet = await this.walletService.findById(
        recipientWalletId,
      );
      const senderWallet = await this.walletService.findById(senderWalletId);

      if (senderWallet.balance < amount) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            error: 'Insufficient funds',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      const creditTransaction = new ReceiveTransfer();
      creditTransaction.amount = amount;
      creditTransaction.balance = (
        Number(recipientWallet.balance) + Number(amount)
      ).toString();
      creditTransaction.receiveuserid = recipient.user.id;
      creditTransaction.senduserid = sender.user.id;
      creditTransaction.receiveWalletId = recipientWalletId;
      creditTransaction.status = TRANSACTION_STATUS.PENDING;
      creditTransaction.currency = CURRENCY.NAIRA;
      creditTransaction.email = recipientEmail;
      // creditTransaction.type = 'credit';
      creditTransaction.remarks = `Credit transfer from ${sender.user.firstName} ${sender.user.lastName}`;

      const debitTransaction = new SendTransfer();
      debitTransaction.amount = amount;
      debitTransaction.balance = (
        Number(senderWallet.balance) - Number(amount)
      ).toString();
      debitTransaction.receiveuserid = recipient.user.id;
      debitTransaction.senduserid = sender.user.id;
      debitTransaction.sendWalletId = senderWalletId;
      debitTransaction.currency = CURRENCY.NAIRA;
      debitTransaction.email = senderEmail;
      debitTransaction.status = TRANSACTION_STATUS.PENDING;
      //      debitTransaction.type = 'debit';
      debitTransaction.remarks = `Debit transfer to ${recipient.user.firstName} ${recipient.user.lastName}`;

      const receiveData = await this.receiveTransferRepository.manager.save(
        creditTransaction,
      );
      const sendData = await this.sendTransferRepository.manager.save(
        debitTransaction,
      );

      // await this.cacheManager.set('receiveId', receiveData.id);
      // await this.cacheManager.set('sendId', sendData.id);

      // sender.data.transfers.push(debitTransaction);
      // recipient.data.transfers.push(creditTransaction);

      // await queryRunner.manager.save(ReceiveTransfer, creditTransaction);
      // await queryRunner.manager.save(SendTransfer, debitTransaction);
      await queryRunner.manager.increment(
        Wallet,
        { id: recipientWalletId },
        'balance',
        Number(amount),
      );
      await queryRunner.manager.decrement(
        Wallet,
        { id: senderWalletId },
        'balance',
        Number(amount),
      );
      //      console.log({ credit: credit, debit: debit });
      await this.receiveTransferRepository.update(receiveData.id, {
        status: TRANSACTION_STATUS.COMPLETED,
      });
      await this.sendTransferRepository.update(sendData.id, {
        status: TRANSACTION_STATUS.COMPLETED,
      });

      await queryRunner.commitTransaction();
      return {
        message: 'Transfer completed successfully',
      };
    } catch (err) {
      // const receiveId = await this.cacheManager.get('receiveId');
      // const sendId = await this.cacheManager.get('sendId');

      // await this.receiveTransferRepository.update(receiveId, {
      //   status: TRANSACTION_STATUS.FAILED,
      // });
      // await this.sendTransferRepository.update(sendId, {
      //   status: TRANSACTION_STATUS.FAILED,
      // });
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
  async transferRequest(createTransferRequestDto: CreateTransferRequestDto) {
    const queryRunner = this.connection.createQueryRunner();

    const { recipientEmail, senderEmail, amount } = createTransferRequestDto;
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const recipient = await this.userService.findByEmail(recipientEmail);
      const sender = await this.userService.findByEmail(senderEmail);

      const tranferRequest = new TransferRequest();
      tranferRequest.amount = amount;
      tranferRequest.status = TRANSFER_REQUEST_STATUS.PENDING;
      tranferRequest.currency = CURRENCY.NAIRA;
      tranferRequest.touserid = sender.user.id;
      tranferRequest.fromuserid = recipient.user.id;
      // creditTransaction.type = 'credit';
      tranferRequest.remarks = `Transfer request from ${recipient.user.firstName} ${recipient.user.lastName} with email: ${recipient.user.email}`;

      await queryRunner.manager.save(TransferRequest, tranferRequest);

      await queryRunner.commitTransaction();
      return {
        message: 'Transfer Request created successfully',
        data: tranferRequest,
      };
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async handleTransferRequest(
    handleTransferRequestDto: HandleTransferRequestDto,
  ) {
    const { transferRequestId, senderDetails, request_option } =
      handleTransferRequestDto;

    try {
      const transferRequest = await this.transferrequestRepository.findOne({
        id: transferRequestId,
      });
      if (transferRequest.touserid !== senderDetails.id) {
        throw new HttpException(
          'You are not the recipient of this transfer request',
          HttpStatus.UNAUTHORIZED,
        );
      }
      if (transferRequest.status !== TRANSFER_REQUEST_STATUS.PENDING) {
        return {
          message: 'Tranfer Request already handled',
        };
      }
      console.log(transferRequest.touserid, senderDetails.id);

      if (transferRequest.touserid !== senderDetails.id) {
        throw new HttpException(
          'You are not the recipient of this transfer request',
          HttpStatus.UNAUTHORIZED,
        );
      }
      const recipientEmail = (
        await this.userService.findById(transferRequest.fromuserid)
      ).user.email;

      // const senderEmail = (
      //   await this.userService.findById(transferRequest.touserid)
      // ).user.email;
      const payload: CreateTransferDto = {
        senderEmail: senderDetails.email,
        amount: transferRequest.amount,
        recipientEmail: recipientEmail,
      };

      if (request_option === TRANSFER_REQUEST_STATUS.ACCEPTED) {
        const transferStatus = await this.transferFunds(payload);

        await this.transferrequestRepository.update(transferRequest.id, {
          status: TRANSFER_REQUEST_STATUS.ACCEPTED,
        });
        return {
          message: transferStatus.message,
        };
      } else if (request_option === TRANSFER_REQUEST_STATUS.DECLINED) {
        await this.transferrequestRepository.update(transferRequest.id, {
          status: TRANSFER_REQUEST_STATUS.DECLINED,
        });
        return {
          message: 'Transfer successfully declined',
        };
      } else {
        return 'hello';
      }
    } catch (err) {
      throw err;
    }
  }

  findAll() {
    return `This action returns all transfers`;
  }

  findOne(id: number) {
    return `This action returns a #${id} transfer`;
  }

  update(id: number, updateTransferDto: UpdateTransferDto) {
    return `This action updates a #${id} transfer`;
  }

  remove(id: number) {
    return `This action removes a #${id} transfer`;
  }
}
