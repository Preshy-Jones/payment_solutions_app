import { IsNumber, IsNotEmpty, IsString } from 'class-validator';

export class FWWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  account_bank;

  @IsString()
  @IsNotEmpty()
  account_number;

  @IsNumber()
  @IsNotEmpty()
  amount;

  @IsString()
  @IsNotEmpty()
  currency;

  @IsNumber()
  @IsNotEmpty()
  wallet_id;
}
