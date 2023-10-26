import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InitiateMNTransferDto {
  @IsNumber()
  @IsNotEmpty()
  amount;

  @IsString()
  @IsNotEmpty()
  reference;

  @IsString()
  @IsNotEmpty()
  narration;

  @IsString()
  @IsNotEmpty()
  destinationBankCode;

  @IsString()
  @IsNotEmpty()
  destinationAccountNumber;

  @IsString()
  @IsNotEmpty()
  currency;
}
