import { EntityRepository, Repository } from 'typeorm';
import { Withdrawal } from '../entities/withdrawal.entity';

@EntityRepository(Withdrawal)
export class WithdrawalRepository extends Repository<Withdrawal> {
  findByReference(reference: string) {
    return this.findOne({ reference });
  }
}
