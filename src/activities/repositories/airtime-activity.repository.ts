import { EntityRepository, Repository } from 'typeorm';
import { AirtimeActivity } from '../entities/airtime-activity.entity';

@EntityRepository(AirtimeActivity)
export class AirtimeActivityRepository extends Repository<AirtimeActivity> {}
