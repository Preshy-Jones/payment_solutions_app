import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BuyDataDto {
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

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  type: string;

  @IsOptional()
  @IsString()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  variation_code: string;
}
