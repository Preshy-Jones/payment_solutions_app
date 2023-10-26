import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class VerifySmileEmailDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  serviceID: string;
}
