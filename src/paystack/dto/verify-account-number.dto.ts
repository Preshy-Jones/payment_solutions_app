import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyAccountNumberDto {
  @IsString()
  @IsNotEmpty()
  accountNumber: string;

  @IsString()
  @IsNotEmpty()
  bankID: string;
}
