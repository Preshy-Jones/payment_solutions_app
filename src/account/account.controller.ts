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
} from '@nestjs/common';
import { AccountService } from './account.service';
import { AddBankAccountDTO } from './dto/add-bank-accoiunt.dto';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  //@UseGuards(PermissionGuard(Permission.EDIT))
  @Post()
  addBankAccount(@Body() addBankAccountDto: AddBankAccountDTO, @Request() req) {
    const { id } = req;
    const { accountNumber, bankCode } = addBankAccountDto;
    return this.accountService.initiateAccountCreation(
      accountNumber,
      bankCode,
      id,
    );
  }

  @Get()
  findAll() {
    return this.accountService.findAllAccounts();
  }

  @Delete()
  deleteAccount() {
    return this.accountService.deleteAccount(1);
  }
}
