import { IsIn, IsNotEmpty, IsString } from 'class-validator';
import { AdminRoles, ADMIN_ROLES } from 'src/common/types/roles.type';
import { CreateUserDto } from './create-user.dto';

export class CreateAdminDto extends CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @IsIn(Object.values(ADMIN_ROLES))
  role: AdminRoles;
}
