import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateVirtualAccountDto {
  @IsString()
  @IsNotEmpty()
  accountRecference;

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
  getAllAvailaibleBanks;

  @IsString()
  @IsNotEmpty()
  tx_ref;

  @IsBoolean()
  @IsNotEmpty()
  is_permanent: true;
}
