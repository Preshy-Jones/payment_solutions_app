import { EntityRepository, Repository } from 'typeorm';
import { Referral } from '../entities/referral.entity';

@EntityRepository(Referral)
export class ReferralRepository extends Repository<Referral> {}
