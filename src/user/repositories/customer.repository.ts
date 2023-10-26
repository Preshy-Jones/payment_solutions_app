import { EntityRepository, Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@EntityRepository(Customer)
export class CustomerRepository extends Repository<Customer> {
  findByEmail(email: string) {
    return this.findOne(
      { email: email },
      {
        relations: [
          'wallets',
          'receivedTransfers',
          'sentTransfers',
          'sentRequests',
          'receivedRequests',
          'electricityBillActivities',
        ],
      },
    );
  }

  findById(id: number) {
    return this.findOne(
      { id: id },
      {
        relations: ['wallets'],
      },
    );
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.findOne({ phoneNumber });
  }

  findByReferralCode(referralCode: string) {
    return this.findOne({ referralCode });
  }
}
