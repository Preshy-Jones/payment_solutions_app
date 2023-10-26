import { IsOptional, IsString } from 'class-validator';
import { TransactionType } from 'src/common/types/transaction.type';

export class TransactionQueryDto {
  @IsString()
  @IsOptional()
  type: TransactionType;
}
