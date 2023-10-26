import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class InitiateDepositDto {
  @IsString()
  @IsNotEmpty()
  amount: string;

  @IsString()
  @IsNotEmpty()
  currency: string;

  @IsString()
  @IsNotEmpty()
  card_number: string;

  @IsString()
  @IsNotEmpty()
  cvv: string;

  @IsString()
  @IsNotEmpty()
  expiry_month: string;

  @IsString()
  @IsNotEmpty()
  expiry_year: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
