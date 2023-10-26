import { AdminRoles } from 'src/common/types/roles.type';
import { Column, Entity } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Administrator extends User {
  @Column()
  role: AdminRoles;
}
