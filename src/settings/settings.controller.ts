import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SettingsService } from './settings.service';
import { CreateSettingDto } from './dto/create-setting.dto';
import { UpdateSettingDto } from './dto/update-setting.dto';
import { ServiceSettingsType } from 'src/common/types/settings.type';

@Controller('settings')
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}
  @Get()
  getAll() {
    return this.settingsService.getAllSettings();
  }

  @Get(':settingName')
  getByName(@Param('settingName') settingName: ServiceSettingsType) {
    return this.settingsService.getSetting(settingName);
  }

  @Post('new')
  addNew(@Body() createSettingDto: CreateSettingDto) {
    return this.settingsService.addSetting(createSettingDto);
  }

  @Patch(':settingName')
  updateOne(
    @Param('settingName') settingName: ServiceSettingsType,
    @Body() updateSettingDto: UpdateSettingDto,
  ) {
    return this.settingsService.updateSetting(settingName, updateSettingDto);
  }

  @Delete(':settingName')
  deleteOne(@Param('settingName') settingName: ServiceSettingsType) {
    return this.settingsService.deleteSetting(settingName);
  }
}
