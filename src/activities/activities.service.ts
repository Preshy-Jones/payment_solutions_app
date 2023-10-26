import { Injectable } from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { Connection, Repository } from 'typeorm';
import { WalletService } from 'src/wallet/wallet.service';
import { VtpassService } from 'src/vtpass/vtpass.service';
import { BuyAirtimeDto } from './dto/buy-airtime.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Services, ServicesType } from 'src/common/types/service.type';
import {
  getTransactionReference,
  getRequestId,
} from 'src/utils/random-generators';
import { AirtimeActivity } from './entities/airtime-activity.entity';
import { BuyElectricityDto } from './dto/buy-electricity.dto';
import { BuyDataDto } from './dto/buy-data.dto';
import { BuyDSTVGOTV } from './dto/buy-dstv-gotv.dto';
import { MobileDataActivity } from './entities/mobiledata-activity.entity';
import { TvSubscriptionActivity } from './entities/tv-subscription-activity.entity';
import { ElectricityBillActivity } from './entities/electricity-bill-activity.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AirtimeActivityRepository } from './repositories/airtime-activity.repository';
import { ElectricityBillActivityRepository } from './repositories/electricity-bill-activity.repository';
import { MobileDataActivityRepository } from './repositories/mobile-data-activity.repository';
import { TvSubscriptionActivityRepository } from './repositories/tv-subscription-activity.repository';
import { BuyShowmaxStartimesDto } from './dto/buy-startimes-showmax.dto';

@Injectable()
export class ActivitiesService {
  constructor(
    private connection: Connection,
    @InjectRepository(AirtimeActivityRepository)
    private airtimeActivityRepository: AirtimeActivityRepository,
    @InjectRepository(ElectricityBillActivityRepository)
    private electricityBillActivityRepository: ElectricityBillActivityRepository,
    @InjectRepository(MobileDataActivityRepository)
    private mobileDataActivityRepository: MobileDataActivityRepository,
    @InjectRepository(TvSubscriptionActivityRepository)
    private tvSubscriptionActivityRepository: TvSubscriptionActivityRepository,
    private readonly vtpassService: VtpassService,
    private readonly walletService: WalletService,
  ) {}
  async buyAirtimeVTPass(buyAirtimeDto: BuyAirtimeDto, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const amount = buyAirtimeDto['amount'];
      const email = user.user.email;

      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );
      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);

      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      const walletId = wallet['id'];
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyAirtimeDto.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: buyAirtimeDto.amount,
        serviceID: buyAirtimeDto.serviceID,
        remarks: 'AIRTIME RECHARGE',
        balance: walletResponse.data.balance,
      };

      const airtime = await queryRunner.manager.create(
        AirtimeActivity,
        payload,
      );
      await queryRunner.manager.save(airtime);

      buyAirtimeDto['request_id'] = request_id;
      //      return buyAirtimeDto;
      const airtimePurchaseResponse = await this.vtpassService.buyAirtime(
        buyAirtimeDto,
      );

      if (airtimePurchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: airtimePurchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          airtimePurchaseResponse['content']['transactions']['status'] !==
          'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: airtimePurchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'Airtime Purchase completed successfully',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async buyElectricity(buyElectrictyDto: BuyElectricityDto, user) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyElectrictyDto.serviceID,
      );
      const amount = buyElectrictyDto.amount;

      // const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      const walletId = wallet['id'];
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyElectrictyDto.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyElectrictyDto.serviceID,
        variation_code: buyElectrictyDto.variation_code,
        remarks: 'ElECTRICITY PURCHASE',
        balance: walletResponse.data.balance,
      };

      const airtime = await queryRunner.manager.create(
        ElectricityBillActivity,
        payload,
      );
      await queryRunner.manager.save(airtime);

      buyElectrictyDto['request_id'] = request_id;
      const purchaseResponse = await this.vtpassService.buyElectricity(
        buyElectrictyDto,
      );
      if (!purchaseResponse['content']['transactions']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'Electricity Bill completed successfully',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async buyMobileData(buyDataDto: BuyDataDto, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyDataDto.serviceID,
      );
      const amount = parseInt(
        variations['content']['varations'].find(
          (variation) =>
            variation['variation_code'] == buyDataDto.variation_code,
        ).variation_amount,
      );

      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );

      const walletId = wallet['id'];
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      //      return amount;
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyDataDto.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyDataDto.serviceID,
        variation_code: buyDataDto.variation_code,
        remarks: 'DATA PURCHASE',
        balance: walletResponse.data.balance,
      };

      const airtime = await queryRunner.manager.create(
        MobileDataActivity,
        payload,
      );
      await queryRunner.manager.save(airtime);

      buyDataDto['request_id'] = request_id;
      const purchaseResponse = await this.vtpassService.buyData(buyDataDto);

      if (purchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'Data Purchase completed successfully',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async bouquetChangeDSTV_GOTV(buyDSTVGOTV: BuyDSTVGOTV, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyDSTVGOTV.serviceID,
      );
      const amount = parseInt(
        variations['content']['varations'].find(
          (variation) =>
            variation['variation_code'] == buyDSTVGOTV.variation_code,
        ).variation_amount,
      );
      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );

      const walletId = wallet['id'];
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }

      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyDSTVGOTV.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyDSTVGOTV.serviceID,
        variation_code: buyDSTVGOTV.variation_code,
        remarks: 'TV SUBSCRIPTION',
        balance: walletResponse.data.balance,
        quantity: 1,
        billersCode: buyDSTVGOTV.billersCode,
      };

      const tvsubscription = await queryRunner.manager.create(
        TvSubscriptionActivity,
        payload,
      );
      await queryRunner.manager.save(tvsubscription);

      buyDSTVGOTV['request_id'] = request_id;
      buyDSTVGOTV['quantity'] = 1;
      const purchaseResponse = await this.vtpassService.bouquetChange(
        buyDSTVGOTV,
      );

      if (purchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'DSTV BOUQUET CHANGED',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async bouquetRenewDSTV_GOTV(buyDSTVGOTV: BuyDSTVGOTV, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyDSTVGOTV.serviceID,
      );
      const amount = parseInt(
        variations['content']['varations'].find(
          (variation) =>
            variation['variation_code'] == buyDSTVGOTV.variation_code,
        ).variation_amount,
      );

      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );

      const walletId = wallet['id'];
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyDSTVGOTV.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyDSTVGOTV.serviceID,
        variation_code: buyDSTVGOTV.variation_code,
        remarks: 'DSTV BOUQUET RENEWAL',
        balance: walletResponse.data.balance,
        quantity: 1,
        billersCode: buyDSTVGOTV.billersCode,
      };

      const tvsubscription = await queryRunner.manager.create(
        TvSubscriptionActivity,
        payload,
      );
      await queryRunner.manager.save(tvsubscription);

      buyDSTVGOTV['request_id'] = request_id;
      buyDSTVGOTV['quantity'] = 1;
      const purchaseResponse = await this.vtpassService.bouquetChange(
        buyDSTVGOTV,
      );

      if (purchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'DSTV BOUQUET RENEWED',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async buyStartimes(buyShowmaxStartimesDto: BuyShowmaxStartimesDto, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyShowmaxStartimesDto.serviceID,
      );
      const amount = parseInt(
        variations['content']['varations'].find(
          (variation) =>
            variation['variation_code'] ==
            buyShowmaxStartimesDto.variation_code,
        ).variation_amount,
      );

      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );

      const walletId = wallet['id'];
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyShowmaxStartimesDto.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyShowmaxStartimesDto.serviceID,
        variation_code: buyShowmaxStartimesDto.variation_code,
        remarks: 'STARTIMES SUBSCRIPTION',
        balance: walletResponse.data.balance,
        quantity: 1,
        billersCode: buyShowmaxStartimesDto.billersCode,
      };

      const tvsubscription = await queryRunner.manager.create(
        TvSubscriptionActivity,
        payload,
      );
      await queryRunner.manager.save(tvsubscription);

      buyShowmaxStartimesDto['request_id'] = request_id;
      buyShowmaxStartimesDto['quantity'] = 1;
      const purchaseResponse = await this.vtpassService.buyStartimes(
        buyShowmaxStartimesDto,
      );

      if (purchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'STARTIMES SUBSCRIPTION SUCCESSFUL',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  async buyShowmax(buyShowmaxStartimesDto: BuyShowmaxStartimesDto, user) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const email = user.email;
      const variations = await this.vtpassService.getVariationCodes(
        buyShowmaxStartimesDto.serviceID,
      );
      const amount = parseInt(
        variations['content']['varations'].find(
          (variation) =>
            variation['variation_code'] ==
            buyShowmaxStartimesDto.variation_code,
        ).variation_amount,
      );

      //      const wallet = await this.walletService.getWalletByOwnerId(user.id);
      const wallet = user.user['wallets'].find(
        (wallet) => wallet['type'] == 'naira',
      );

      const walletId = wallet['id'];
      if (wallet.balance < amount) {
        throw new HttpException(
          'Not enough funds in your wallet',
          HttpStatus.BAD_REQUEST,
        );
      }
      const walletResponse = await this.walletService.removeMoney(
        {
          walletId,
          amount,
        },
        queryRunner,
      );
      const request_id = await getRequestId();
      const payload = {
        customer: buyShowmaxStartimesDto.phone,
        walletid: wallet.id,
        userid: user.user.id,
        email: user.user.email,
        transactionReference: request_id,
        service: Services.VTPASS,
        amount: amount,
        serviceID: buyShowmaxStartimesDto.serviceID,
        variation_code: buyShowmaxStartimesDto.variation_code,
        remarks: 'SHOWMAX SUBSCRIPTION',
        balance: walletResponse.data.balance,
        quantity: 1,
        billersCode: buyShowmaxStartimesDto.billersCode,
      };

      const tvsubscription = await queryRunner.manager.create(
        TvSubscriptionActivity,
        payload,
      );
      await queryRunner.manager.save(tvsubscription);

      buyShowmaxStartimesDto['request_id'] = request_id;
      buyShowmaxStartimesDto['quantity'] = 1;
      const purchaseResponse = await this.vtpassService.buyShowmax(
        buyShowmaxStartimesDto,
      );

      if (purchaseResponse['content']['errors']) {
        throw new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            error: purchaseResponse['response_description'],
          },
          HttpStatus.BAD_REQUEST,
        );
      } else {
        if (
          purchaseResponse['content']['transactions']['status'] !== 'delivered'
        ) {
          throw new HttpException(
            {
              status: HttpStatus.BAD_REQUEST,
              error: purchaseResponse['response_description'],
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      }

      await queryRunner.commitTransaction();
      //      return buyAirtimeDto;
      return {
        message: 'SHOWMAX SUBSCRIPTION SUCCESSFUL',
      };
      return { email, amount };
    } catch (err) {
      // since we have errors lets rollback the changes we made
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }

  create(createActivityDto: CreateActivityDto) {
    return 'This action adds a new activity';
  }

  findAll() {
    return `This action returns all activities`;
  }

  findOne(id: number) {
    return `This action returns a #${id} activity`;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  remove(id: number) {
    return `This action removes a #${id} activity`;
  }
}
