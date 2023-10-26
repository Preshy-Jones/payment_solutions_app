import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class BuyStartimesDto {
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

  @IsNotEmpty()
  @IsString()
  billersCode: string;

  @IsString()
  @IsNotEmpty()
  variation_code: string;
}
