import { EntityRepository, Repository } from 'typeorm';
import { Wallet } from '../entities/wallet.entity';

@EntityRepository(Wallet)
export class WalletRepository extends Repository<Wallet> {
  findByUserEmail(email: string) {
    return this.findOne({
      where: {
        user: {
          email: email,
        },
      },
      relations: ['user'],
    });
  }
}
