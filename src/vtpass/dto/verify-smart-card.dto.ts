import { IsNotEmpty, IsString } from 'class-validator';

export class VerifySmartCardDto {
  @IsString()
  @IsNotEmpty()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  serviceID: string;
}
