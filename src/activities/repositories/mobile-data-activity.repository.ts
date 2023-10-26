import { EntityRepository, Repository } from 'typeorm';
import { MobileDataActivity } from '../entities/mobiledata-activity.entity';

@EntityRepository(MobileDataActivity)
export class MobileDataActivityRepository extends Repository<MobileDataActivity> {}
