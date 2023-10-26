import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferRecipientDto {
  @IsNotEmpty()
  @IsString()
  type: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  account_number: string;

  @IsNotEmpty()
  @IsString()
  bank_code: string;

  @IsNotEmpty()
  @IsString()
  currency: string;
}
