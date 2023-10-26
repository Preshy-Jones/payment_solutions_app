import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ServiceSettingsType,
  ServicesSettings,
} from 'src/common/types/settings.type';
import { Repository } from 'typeorm';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { Setting } from './entities/setting.entity';
import { Cache } from 'cache-manager';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Setting) private settingRepository: Repository<Setting>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}
  async getSetting(name: ServiceSettingsType) {
    const result = await this.settingRepository.findOne({ name });

    await this.cacheManager.set(name, result);

    return result;
  }

  async getAllSettings() {
    return await this.settingRepository.find();
  }

  async addSetting(createSettingDto: CreateSettingDto) {
    const existingSetting = await this.settingRepository.findOne({
      name: createSettingDto.name,
    });

    if (existingSetting) {
      throw new HttpException('Setting currently exists', HttpStatus.CONFLICT);
    }

    const setting = await this.settingRepository.create(createSettingDto);
    await this.settingRepository.save(setting);
    await this.cacheManager.set(setting.name, setting);
    return setting;
  }

  async updateSetting(
    name: ServiceSettingsType,
    updateSettingDto: UpdateSettingDto,
  ) {
    await this.settingRepository.update({ name }, updateSettingDto);

    console.log(name);

    await this.cacheManager.del(name);

    const setting = await this.settingRepository.findOne({ name });

    switch (name) {
      case ServicesSettings.BANK_SERVICE:
        await this.cacheManager.del('allBanks');
    }

    await this.cacheManager.set(name, setting);

    return setting;
  }

  async deleteSetting(name: ServiceSettingsType) {
    await this.settingRepository.delete({ name });

    await this.cacheManager.del(name);

    return;
  }
}
