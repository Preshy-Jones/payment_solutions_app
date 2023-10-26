import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlutterwaveService } from './flutterwave.service';
import { InitiateDepositDto } from './dto/initiate-deposit.dto';
import { AuthorizeDepositDto } from './dto/authorize-deposit.dto';
import { request } from 'http';
import { Public } from 'src/common/decorators/jwt-auth-guard.decorator';

@Controller('flutterwave')
export class FlutterwaveController {
  constructor(private readonly flutterwaveService: FlutterwaveService) {}
  @Public()
  @Get()
  test() {
    return this.flutterwaveService.getNairaWalletBalance();
  }
}
