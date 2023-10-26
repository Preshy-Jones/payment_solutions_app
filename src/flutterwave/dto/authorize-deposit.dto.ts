import { IsNotEmpty, IsString } from 'class-validator';
import { AuthorizeDepositData } from '../interfaces/deposits.interface';

export class AuthorizeDepositDto extends AuthorizeDepositData {
  @IsNotEmpty()
  @IsString()
  mode: string;

  @IsNotEmpty()
  @IsString()
  pin: string;
}
