import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BuyAirtimeDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  country: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  customer: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phone: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  request_id: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  serviceID: string;

  @IsNumber()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type: string;
}
