import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class BuyAirtimeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  request_id: string;

  @IsNotEmpty()
  @IsString()
  serviceID: string;

  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  phone: string;
}
