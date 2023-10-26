import { IsString, IsNotEmpty } from 'class-validator';

export class InitiateWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  account_bank;

  @IsString()
  @IsNotEmpty()
  account_number;

  @IsString()
  @IsNotEmpty()
  amount;

  @IsString()
  @IsNotEmpty()
  narration;

  @IsString()
  @IsNotEmpty()
  reference;

  @IsString()
  @IsNotEmpty()
  currency;
}
