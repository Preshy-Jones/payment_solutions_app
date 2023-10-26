import { PartialType } from '@nestjs/mapped-types';
import { CreateTvsubscriptionDto } from './create-tvsubscription.dto';

export class UpdateTvsubscriptionDto extends PartialType(
  CreateTvsubscriptionDto,
) {}
