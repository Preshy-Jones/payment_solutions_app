import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateReferralDto {
  @IsNotEmpty()
  @IsNumber()
  referredById: number;

  @IsNotEmpty()
  @IsNumber()
  referredId: number;
}
