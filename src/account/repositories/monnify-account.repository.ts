import { EntityRepository, Repository } from 'typeorm';
import { MonnifyAccount } from '../entities/monnnify-account.entity';

@EntityRepository(MonnifyAccount)
export class MonnifyAccountRepository extends Repository<MonnifyAccount> {}
