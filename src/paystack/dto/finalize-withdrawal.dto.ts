import { IsNotEmpty, IsString } from 'class-validator';

export class FinalizeWithdrawalDto {
  @IsNotEmpty()
  @IsString()
  transfer_code: string;

  @IsNotEmpty()
  @IsString()
  otp: string;
}
