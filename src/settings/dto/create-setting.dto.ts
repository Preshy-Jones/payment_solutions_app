import { Type } from 'class-transformer';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';
import { ServicesType } from 'src/common/types/service.type';
import { ServiceSettingsType } from 'src/common/types/settings.type';

export class CreateSettingDto {
  @IsString()
  @IsNotEmpty()
  name: ServiceSettingsType;

  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @IsString()
  @IsNotEmpty()
  value: ServicesType;
}
