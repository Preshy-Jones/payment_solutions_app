import { EntityRepository, Repository } from 'typeorm';
import { Administrator } from '../entities/administrator.entity';

@EntityRepository(Administrator)
export class AdminRepository extends Repository<Administrator> {
  findByEmail(email: string) {
    return this.findOne({ email });
  }

  findById(id: number) {
    return this.findOne({ id });
  }

  findByPhoneNumber(phoneNumber: string) {
    return this.findOne({ phoneNumber });
  }
}
