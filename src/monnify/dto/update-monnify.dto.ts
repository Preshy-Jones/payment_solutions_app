import { PartialType } from '@nestjs/mapped-types';
import { CreateMonnifyDto } from './create-monnify.dto';

export class UpdateMonnifyDto extends PartialType(CreateMonnifyDto) {}
