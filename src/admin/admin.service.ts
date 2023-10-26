import { Injectable } from '@nestjs/common';
import { BankService } from 'src/bank/bank.service';
import { AdminRoles } from 'src/common/types/roles.type';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
import { CreateSettingDto } from 'src/settings/dto/create-setting.dto';
import { UpdateSettingDto } from 'src/settings/dto/update-setting.dto';
import { SettingsService } from 'src/settings/settings.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { WalletService } from 'src/wallet/wallet.service';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Connection, Repository } from 'typeorm';
import { CreateAdminDto } from 'src/user/dto/create-admin.dto';
import { Activity } from './entities/activity.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    private readonly settingsService: SettingsService,
    private readonly userService: UserService,
    private readonly walletService: WalletService,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly transactionsService: TransactionsService,
    private readonly bankService: BankService,
  ) {}

  async createNewAdmin(payload: CreateAdminDto) {
    try {
      const admin = await this.userService.createAdmin(payload);

      return {
        message: 'Admin created successfully',
        data: {
          admin,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getSummary() {
    try {
      const { totalUsers } = await this.userService.getTotalNumberOfUsers();

      const { totalUsersNaira } = await this.walletService.getTotalUsersNaira();

      const walletBalance = await this.bankService.getNairaWalletBAlance();

      const { totalDeposits } =
        await this.transactionsService.getTotalDepositsBalance();

      const { totalWithdrawals } =
        await this.transactionsService.getTotalWithdrawalsBalance();

      const totalTransactions = totalDeposits + totalWithdrawals;

      return {
        totalUsers,
        totalUsersNaira,
        ...walletBalance,
        totalDeposits,
        totalTransactions,
        totalWithdrawals,
      };
    } catch (error) {
      throw error;
    }
  }

  /*async addNewSetting(createSettingDto: CreateSettingDto) {
    return await this.settingsService.addSetting(createSettingDto);
  }
  async getSetting(id) {
    return await this.settingsService.getSetting(id);
  }

  async editSetting(updateSettingDto: UpdateSettingDto, id) {
    return await this.settingsService.updateSetting(id, updateSettingDto);
  }
*/
  async getUserActivities(id: string) {
    try {
      return await this.activityRepository.find({ userid: id });
    } catch (error) {
      throw error;
    }
  }

  async getAllActivities() {
    try {
      return await this.activityRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async sortAllActivities() {
    try {
      return await this.activityRepository
        .createQueryBuilder('activitiy')
        .orderBy('activitiy.createddate', 'ASC')
        .getMany();
    } catch (error) {
      throw error;
    }
  }
}
