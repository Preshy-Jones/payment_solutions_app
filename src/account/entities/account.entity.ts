import { EntityContainer } from 'src/common/types/entity';
import { Column } from 'typeorm';

export abstract class Account extends EntityContainer {
  @Column()
  public accountName: string;

  @Column()
  public bankCode: string;

  @Column()
  public accountNumber: string;

  @Column()
  public userId: number;
}
