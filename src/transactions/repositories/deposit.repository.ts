import { EntityRepository, Repository } from 'typeorm';
import { Deposit } from '../entities/deposit.entity';
import { Withdrawal } from '../entities/withdrawal.entity';

@EntityRepository(Deposit)
export class DepositRepository extends Repository<Deposit> {
  findByReference(reference: string) {
    return this.findOne({ reference });
  }
}
