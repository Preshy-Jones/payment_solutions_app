import { IsNotEmpty, IsString } from 'class-validator';

export class ValidateDepositDto {
  @IsString()
  @IsNotEmpty()
  otp: string;

  @IsString()
  @IsNotEmpty()
  flw_ref: string;
}
