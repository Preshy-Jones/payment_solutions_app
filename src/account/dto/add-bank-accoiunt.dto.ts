import { IsNotEmpty, IsString } from 'class-validator';

export class AddBankAccountDTO {
  @IsNotEmpty()
  @IsString()
  bankCode: string;

  @IsNotEmpty()
  @IsString()
  accountNumber: string;
}
