import { IsNotEmpty, IsString } from 'class-validator';

export class UssdDepositDto {
  @IsString()
  @IsNotEmpty()
  account_bank: string;

  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phone_number: string;
}
