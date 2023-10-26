import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class VerifySmilePhoneDto {
  @IsString()
  @IsNotEmpty()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  serviceID: string;
}
