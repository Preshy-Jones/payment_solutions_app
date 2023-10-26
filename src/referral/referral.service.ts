import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReferralDto } from './dto/create-referral.dto';
import { UpdateReferralDto } from './dto/update-referral.dto';
import { ReferralRepository } from './repositories/referral.repository';

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(ReferralRepository)
    private referralRepository: ReferralRepository,
  ) {}

  async createReferral(createReferralDto: CreateReferralDto) {
    try {
      const newReferral = await this.referralRepository.create(
        createReferralDto,
      );

      await this.referralRepository.save(newReferral);
    } catch (error) {
      throw error;
    }
  }

  create(createReferralDto: CreateReferralDto) {
    return 'This action adds a new referral';
  }

  findAll() {
    return `This action returns all referral`;
  }

  findOne(id: number) {
    return `This action returns a #${id} referral`;
  }

  update(id: number, updateReferralDto: UpdateReferralDto) {
    return `This action updates a #${id} referral`;
  }

  remove(id: number) {
    return `This action removes a #${id} referral`;
  }
}
