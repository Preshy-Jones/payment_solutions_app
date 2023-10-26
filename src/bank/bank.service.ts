import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { ServicesSettings } from 'src/common/types/settings.type';
import {
  BankServices,
  BANK_SERVICES,
  Services,
} from 'src/common/types/service.type';
import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
import { SettingsService } from 'src/settings/settings.service';
import { MonnifyService } from 'src/monnify/monnify.service';

const { MONNIFY, FLUTTERWAVE } = BANK_SERVICES;

@Injectable()
export class BankService {
  private currentService: BankServices;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly settingsService: SettingsService,
    private readonly flutterwaveService: FlutterwaveService,
    private readonly monnifyService: MonnifyService,
  ) {
    this.currentService = MONNIFY;
  }

  /*async getCurrentService() {
    let data;
    data = await this.cacheManager.get<any>(ServicesSettings.BANK_SERVICE);

    if (!data) {
      data = await this.settingsService.getSetting(
        ServicesSettings.BANK_SERVICE,
      );
    }

    if (!data) {
      throw new HttpException(
        'Service currently unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }

    const status = data.isActive;

    if (!status) {
      throw new HttpException(
        'Service currently unavailable',
        HttpStatus.SERVICE_UNAVAILABLE,
      );
    }
    const service = data.value;

    switch (service) {
      case Services.FLUTTERWAVE:
        this.currentService = this.flutterwaveService;
        break;
      case Services.MONNIFY:
        this.currentService = this.monnifyService;
    }
  }

  /async getAllBanks() {
    await this.getCurrentService();

    return this.currentService.getAllBankCodes();
  }*/

  async getAllBanks() {
    try {
      switch (this.currentService) {
        case MONNIFY:
          return await this.monnifyService.getAllBankCodes();
      }
    } catch (error) {
      throw error;
    }
  }

  async getNairaWalletBAlance() {
    try {
      switch (this.currentService) {
        case MONNIFY:
          const result = await this.monnifyService.getWalletBalance(
            '2953846525',
          );

          return {
            monnifyWalletBalance: result,
          };
      }
    } catch (error) {
      throw error;
    }
  }
}
