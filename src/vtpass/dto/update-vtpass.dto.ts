import { PartialType } from '@nestjs/mapped-types';
import { CreateVtpassDto } from './create-vtpass.dto';

export class UpdateVtpassDto extends PartialType(CreateVtpassDto) {}
