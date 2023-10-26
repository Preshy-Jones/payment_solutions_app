import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';

export class SetPinDTO {
  @IsString()
  @IsNotEmpty()
  password;

  @IsNumber()
  @IsNotEmpty()
  @Max(9999, {
    message: 'Pin must be 4 digits',
  })
  @Min(1000, {
    message: 'pin cannot start with 0',
  })
  pin;
}
