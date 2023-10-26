import { Exclude } from 'class-transformer';
import { Column } from 'typeorm';
import { EntityContainer } from 'src/common/types/entity';

export abstract class User extends EntityContainer {
  @Column()
  public firstName: string;

  @Column()
  public lastName: string;

  @Column({ unique: true })
  public email: string;

  @Column({ unique: true })
  public phoneNumber: string;

  @Exclude()
  @Column()
  public password: string;

  @Column({ nullable: true })
  profileImage: string;
}
