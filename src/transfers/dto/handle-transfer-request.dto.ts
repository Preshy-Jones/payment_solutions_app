import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { TransferRequestStatus } from 'src/common/types/status.type';

export class HandleTransferRequestDto {
  @IsNotEmpty()
  @IsNumber()
  transferRequestId: number;

  @IsNotEmpty()
  @IsOptional()
  senderDetails: SenderDetails;

  @IsNotEmpty()
  @IsString()
  request_option: TransferRequestStatus;
}

export interface SenderDetails {
  id: number;
  email: string;
}
