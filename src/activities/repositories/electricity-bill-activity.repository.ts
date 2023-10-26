import { EntityRepository, Repository } from 'typeorm';
import { ElectricityBillActivity } from '../entities/electricity-bill-activity.entity';

@EntityRepository(ElectricityBillActivity)
export class ElectricityBillActivityRepository extends Repository<ElectricityBillActivity> {}
