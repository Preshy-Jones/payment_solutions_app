import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class InitializeWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  source: string;

  @IsString()
  @IsNotEmpty()
  reason: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  recipient: string;
}
