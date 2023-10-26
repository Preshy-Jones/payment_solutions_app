import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateReservedAccountDto {
  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  bvn;

  @IsString()
  @IsNotEmpty()
  tx_ref;

  @IsBoolean()
  @IsNotEmpty()
  is_permanent: true;
}
