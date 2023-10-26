import { IsNotEmpty, IsString } from 'class-validator';

export class VerifyTransactionDto {
  @IsString()
  @IsNotEmpty()
  reference: string;
}
