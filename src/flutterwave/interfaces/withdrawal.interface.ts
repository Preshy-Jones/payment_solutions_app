import { IsNotEmpty, IsString } from 'class-validator';
import { InitiateWithdrawalDto } from '../dto/initiate-withdrawal.dto';

export class InitiateWithdrawalData extends InitiateWithdrawalDto {
  @IsString()
  @IsNotEmpty()
  reference: string;
}
