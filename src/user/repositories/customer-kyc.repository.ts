import { EntityRepository, Repository } from 'typeorm';
import { CustomerKyc } from '../entities/customer-kyc.entity';

@EntityRepository(CustomerKyc)
export class CustomerKycRepository extends Repository<CustomerKyc> {}
