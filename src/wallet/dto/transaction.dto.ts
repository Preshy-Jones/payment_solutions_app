import { IsEmail, IsNotEmpty, IsNumber } from 'class-validator';

export class TransactionDto {
  @IsNumber()
  @IsNotEmpty()
  amount: number;

  //   @IsEmail()
  //  // @IsNotEmpty()
  //   email: string;

  @IsNumber()
  @IsNotEmpty()
  walletId: number;
}
