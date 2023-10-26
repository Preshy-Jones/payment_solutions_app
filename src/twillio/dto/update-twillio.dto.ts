import { PartialType } from '@nestjs/mapped-types';
import { CreateTwillioDto } from './create-twillio.dto';

export class UpdateTwillioDto extends PartialType(CreateTwillioDto) {}
