import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BuyWAECDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  request_id: string;

  @IsNotEmpty()
  @IsString()
  serviceID: string;

  @IsNotEmpty()
  @IsNumber()
  @IsOptional()
  amount: number;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  variation_code: string;
}
