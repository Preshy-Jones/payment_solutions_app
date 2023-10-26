import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateWalletDto } from './dto/create-wallet.dto';
import { UpdateWalletDto } from './dto/update-wallet.dto';
import { TransactionDto } from './dto/transaction.dto';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // @Post('deposit')
  // deposit(@Body() transactionDto: TransactionDto) {
  //   return this.walletService.deposit(transactionDto);
  // }

  @Get()
  getall() {
    return this.walletService.find();
  }
}
