import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  CacheInterceptor,
  CacheKey,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { VerifyAccountNumberDto } from './dto/verify-account-number.dto';
import { VerifyBvnDto } from './dto/verify-bvn.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  /*@UseInterceptors(CacheInterceptor)
  @CacheKey('allBanks')
  @Get('all')
  getAll() {
    return this.bankService.getAllBanks();
  }*/
}
