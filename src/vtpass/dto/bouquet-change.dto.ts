import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BouquetChangeDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  request_id: string;

  @IsNotEmpty()
  @IsString()
  serviceID: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsString()
  @IsNotEmpty()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  variation_code: string;

  @IsString()
  @IsNotEmpty()
  subscription_type: string;

  @IsNumber()
  quantity: number;
}
