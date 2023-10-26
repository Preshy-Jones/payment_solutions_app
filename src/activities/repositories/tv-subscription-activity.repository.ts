import { EntityRepository, Repository } from 'typeorm';
import { TvSubscriptionActivity } from '../entities/tv-subscription-activity.entity';

@EntityRepository(TvSubscriptionActivity)
export class TvSubscriptionActivityRepository extends Repository<TvSubscriptionActivity> {}
