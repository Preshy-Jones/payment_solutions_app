import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferRequestDto {
  @IsNotEmpty()
  @IsString()
  recipientEmail: string;

  @IsNotEmpty()
  @IsString()
  amount: number;

  @IsNotEmpty()
  @IsString()
  senderEmail: string;
}
