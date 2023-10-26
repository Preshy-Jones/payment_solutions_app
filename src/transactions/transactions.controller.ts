import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
  Query,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { PaystackService } from 'src/paystack/paystack.service';
import { VerifyTransactionDto } from './dto/verify-transaction.dto';
import { JwtAuthGaurd } from '../common/gaurds/jwt-auth.gaurd';
import { Public } from 'src/common/decorators/jwt-auth-guard.decorator';
import { FWWithdrawalDto } from './dto/withdrawal.dto';
import { BANK_SERVICES } from 'src/common/types/service.type';
import { TransactionStatus } from 'src/common/types/status.type';
import {
  CheckAbilities,
  CreateWithdrawalPermission,
  ReadWithdrawalPermission,
} from 'src/ability/abilities.decorator';
import { TransactionQueryDto } from './dto/transaction-query.dto';
import { TRANSACTION } from 'src/common/types/transaction.type';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  @Public()
  @Post('/confirm-withdrawal')
  confirmWithdrawalCallback(@Body() body) {
    return body;
  }

  // @CheckAbilities(new CreateWithdrawalPermission())
  // @Post('withdraw')
  // initiateWithdrawal(@Body() body: FWWithdrawalDto, @Request() req) {
  //   return this.transactionsService.initiateWithdrawal(body, req.user);
  // }

  @Post('update-status/:id')
  updateStatus(
    @Body() body: { status: TransactionStatus },
    @Param('id') id: number,
  ) {
    return this.transactionsService.updateTransactionStatus(id, body.status);
  }

  @Public()
  @Get()
  getAllTransactions(@Query() query: TransactionQueryDto) {
    let type;

    if (query) {
      if (query.type === TRANSACTION.WITHDRAWAL) {
        type = TRANSACTION.WITHDRAWAL;
      } else if (query.type === TRANSACTION.DEPOSIT) {
        type = TRANSACTION.DEPOSIT;
      } else if (!query.type) {
        type = 'all';
      } else {
        throw new HttpException(
          'Invalid query parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!query) {
      type = 'all';
    }

    return this.transactionsService.getAllTransactions(type);
  }

  @CheckAbilities(new ReadWithdrawalPermission())
  @Get('current-user')
  getCurrentUsersTransactions(
    @Request() req,
    @Query() query: TransactionQueryDto,
  ) {
    let type;

    if (query) {
      if (query.type === TRANSACTION.WITHDRAWAL) {
        type = TRANSACTION.WITHDRAWAL;
      } else if (query.type === TRANSACTION.DEPOSIT) {
        type = TRANSACTION.DEPOSIT;
      } else if (!query.type) {
        type = 'all';
      } else {
        throw new HttpException(
          'Invalid query parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!query) {
      type = 'all';
    }
    const { user } = req.user;
    return this.transactionsService.getUserTransactions(user.id, type);
  }

  @Get('user/:id')
  getuserTransactionsById(
    @Param('id') id: number,
    @Query() query: TransactionQueryDto,
  ) {
    let type;

    if (query) {
      if (query.type === TRANSACTION.WITHDRAWAL) {
        type = TRANSACTION.WITHDRAWAL;
      } else if (query.type === TRANSACTION.DEPOSIT) {
        type = TRANSACTION.DEPOSIT;
      } else if (!query.type) {
        type = 'all';
      } else {
        throw new HttpException(
          'Invalid query parameter',
          HttpStatus.BAD_REQUEST,
        );
      }
    }
    if (!query) {
      type = 'all';
    }
    return this.transactionsService.getUserTransactions(id, type);
  }

  @CheckAbilities(new ReadWithdrawalPermission())
  @Get(':id')
  getTransactionById(@Param('id') id: number) {
    return this.transactionsService.findOneTransaction(id);
  }
}
