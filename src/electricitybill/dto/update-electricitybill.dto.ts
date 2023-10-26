import { PartialType } from '@nestjs/mapped-types';
import { CreateElectricitybillDto } from './create-electricitybill.dto';

export class UpdateElectricitybillDto extends PartialType(
  CreateElectricitybillDto,
) {}
