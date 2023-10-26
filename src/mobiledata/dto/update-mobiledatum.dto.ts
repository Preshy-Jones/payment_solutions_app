import { PartialType } from '@nestjs/mapped-types';
import { CreateMobiledatumDto } from './create-mobiledatum.dto';

export class UpdateMobiledatumDto extends PartialType(CreateMobiledatumDto) {}
