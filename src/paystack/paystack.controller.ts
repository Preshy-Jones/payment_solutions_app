import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaystackService } from './paystack.service';
import { CreatePaystackDto } from './dto/create-paystack.dto';
import { UpdatePaystackDto } from './dto/update-paystack.dto';
import { CreateTransferRecipientDto } from './dto/create-transfer-recipient.dto';
import { InitializeWithdrawalDto } from './dto/initialize-withdrawal.dto';
import { FinalizeWithdrawalDto } from './dto/finalize-withdrawal.dto';
import { VerifyAccountNumberDto } from './dto/verify-account-number.dto';

@Controller('paystack')
export class PaystackController {
  constructor(private readonly paystackService: PaystackService) {}

  @Post()
  create(@Body() createPaystackDto: CreatePaystackDto) {
    return this.paystackService.create(createPaystackDto);
  }

  @Post('/create_transfer_recipient')
  createTransferRecipient(
    @Body() createTransferRecipientDto: CreateTransferRecipientDto,
  ) {
    return this.paystackService.createTransferRecipient(
      createTransferRecipientDto,
    );
  }

  @Post('/initialize_withdrawal')
  initializeDeposit(@Body() initializeWithdrawalDto: InitializeWithdrawalDto) {
    return this.paystackService.initializeWithdrawal(initializeWithdrawalDto);
  }

  @Post('/finalize_withdrawal')
  finalizeDeposit(@Body() finalizeDepositDto: FinalizeWithdrawalDto) {
    return this.paystackService.finalizeWithdrawal(finalizeDepositDto);
  }

  @Get('banklist')
  getBankList() {
    return this.paystackService.bankList();
  }

  @Get('verify_account_number/:accountNumber/:bankID')
  verifyAccountNumber(@Param() params: VerifyAccountNumberDto) {
    //    return params;
    return this.paystackService.verifyAccountNumber(params);
  }

  @Get()
  findAll() {
    return this.paystackService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paystackService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePaystackDto: UpdatePaystackDto,
  ) {
    return this.paystackService.update(+id, updatePaystackDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paystackService.remove(+id);
  }
}
