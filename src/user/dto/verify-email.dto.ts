import { IsNotEmpty, IsString, Length } from 'class-validator';

export class VerifyEmailDTO {
  @IsString()
  @IsNotEmpty()
  email;

  @IsString()
  @Length(6)
  code;
}
