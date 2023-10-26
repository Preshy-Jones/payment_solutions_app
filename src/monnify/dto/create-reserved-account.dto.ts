import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservedAccountDto {
  @IsString()
  @IsNotEmpty()
  accountReference;

  @IsString()
  @IsNotEmpty()
  accountName;

  @IsString()
  @IsNotEmpty()
  currencyCode;

  @IsString()
  @IsNotEmpty()
  customerEmail;

  @IsString()
  @IsNotEmpty()
  bvn;

  @IsString()
  @IsNotEmpty()
  customerName;

  @IsBoolean()
  @IsNotEmpty()
  getAllAvailableBanks;
}
