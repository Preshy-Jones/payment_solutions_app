import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';

export class UpdateAdminDto extends PartialType(CreateAdminDto) {}
