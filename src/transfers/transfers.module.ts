import { Module } from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { TransfersController } from './transfers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { WalletModule } from 'src/wallet/wallet.module';
import { ReceiveTransferRepository } from './repositories/receive-transfer.repository';
import { SendTransferRepository } from './repositories/send-transfer.repository';
import { TransferRequestRepository } from './repositories/transfer-request.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ReceiveTransferRepository,
      SendTransferRepository,
      TransferRequestRepository,
    ]),
    UserModule,
    WalletModule,
  ],
  controllers: [TransfersController],
  providers: [TransfersService],
})
export class TransfersModule {}
