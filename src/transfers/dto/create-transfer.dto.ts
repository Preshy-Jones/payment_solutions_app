import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTransferDto {
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
