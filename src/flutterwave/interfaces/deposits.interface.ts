import { IsNotEmpty, IsString } from 'class-validator';
import { InitiateDepositDto } from '../dto/initiate-deposit.dto';
import { UssdDepositDto } from '../dto/ussd-deposit.dto';

export class AuthorizeDepositData extends InitiateDepositDto {
  @IsString()
  @IsNotEmpty()
  tx_ref: string;
}

export class UssdDepositData extends UssdDepositDto {
  @IsString()
  @IsNotEmpty()
  tx_ref: string;
}
