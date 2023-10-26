import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class QueryTransactionStatusDto {
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  request_id: string;
}
