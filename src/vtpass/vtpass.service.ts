import { CreateVtpassDto } from './dto/create-vtpass.dto';
import { UpdateVtpassDto } from './dto/update-vtpass.dto';
import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';
import { Observable, map, lastValueFrom, catchError, of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { BuyAirtimeDto } from './dto/buy-airtime.dto';
import { BuyDataDto } from './dto/buy-data.dto';
import { QueryTransactionStatusDto } from './dto/query-transaction-status.dto';
import { VerifySmilePhoneDto } from './dto/verify-smile-phone.dto';
import { VerifySmileEmailDto } from './dto/verify-smile-email.dto';
import { VerifySmartCardDto } from './dto/verify-smart-card.dto';
import { BouquetChangeDto } from './dto/bouquet-change.dto';
import { BouquetRenewalDto } from './dto/bouquet-renewal.dto';
import { BuyStartimesDto } from './dto/buy-startimes.dto';
import { BuyShowmaxDto } from './dto/buy-showmax.dto';
import { BuyWAECDto } from './dto/buy-waec.dto';
import { BuyElectricityDto } from './dto/buy-electricity.dto';
import { getRequestId } from 'src/utils/random-generators';

@Injectable()
export class VtpassService {
  private secretKey: string;
  private publicKey: string;
  private requestHeaders;
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.secretKey = this.configService.get('VTPASS_SECRET_KEY');
    this.publicKey = this.configService.get('VTPASS_PUBLIC_KEY');
    const base64encodedData = Buffer.from(
      this.configService.get('VTPASS_EMAIL') +
        ':' +
        this.configService.get('VTPASS_PASSWORD'),
    ).toString('base64');
    this.requestHeaders = {
      headers: {
        Authorization: 'Basic ' + base64encodedData,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
  }

  async buyAirtime(
    buyAirtimeDto: BuyAirtimeDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyAirtimeDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //        console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async getVariationCodes(
    serviceID: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .get(
        `https://sandbox.vtpass.com/api/service-variations?serviceID=${serviceID}`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
          // throw new HttpException(
          //   error.response.data.message.error,
          //   error.response.status,
          // );
        }),
      );
    return await lastValueFrom(response);
  }
  async getServiceIds(
    identifier: string,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .get(
        `https://vtpass.com/api/services?identifier=${identifier}`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          throw error;
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async getVtpassServicesIdentifiers(): Promise<
    Observable<AxiosResponse<any>>
  > {
    const response = this.httpService
      .get(
        'https://sandbox.vtpass.com/api/service-categories',
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async buyData(
    buyDataDto: BuyDataDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyDataDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async queryTransactionStatus(
    queryTransactionStatusDto: QueryTransactionStatusDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/requery',
        queryTransactionStatusDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async verifySmilePhone(
    verifySmilePhoneDto: VerifySmilePhoneDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/merchant-verify/smile/phone',
        verifySmilePhoneDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async verifySmileEmail(
    verifySmileEmailDto: VerifySmileEmailDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        ' https://sandbox.vtpass.com/api/merchant-verify/smile/email',
        verifySmileEmailDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async verifySmartCardNumber(
    verifySmartCardDto: VerifySmartCardDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/merchant-verify',
        verifySmartCardDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async bouquetChange(
    bouquetChangeDto: BouquetChangeDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    //    return bouquetChangeDto;
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        bouquetChangeDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async bouquetRenewal(
    bouquetRenewalDto: BouquetRenewalDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        bouquetRenewalDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async buyStartimes(
    buyStartimesDto: BuyStartimesDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyStartimesDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async buyShowmax(
    buyShowmaxDto: BuyShowmaxDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const request_id = await getRequestId();
    buyShowmaxDto['request_id'] = request_id;

    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyShowmaxDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async buyWAEC(
    buyWAECDto: BuyWAECDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyWAECDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  async buyElectricity(
    buyElectricityDto: BuyElectricityDto,
  ): Promise<Observable<AxiosResponse<any>>> {
    const response = this.httpService
      .post(
        'https://sandbox.vtpass.com/api/pay',
        buyElectricityDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          //          console.log(error);
          throw new HttpException(error.response.data, error.response.status);
        }),
      );
    return await lastValueFrom(response);
  }

  create(createVtpassDto: CreateVtpassDto) {
    return 'This action adds a new vtpass';
  }

  findAll() {
    return `This action returns all vtpass`;
  }

  findOne(id: number) {
    return `This action returns a #${id} vtpass`;
  }

  update(id: number, updateVtpassDto: UpdateVtpassDto) {
    return `This action updates a #${id} vtpass`;
  }

  remove(id: number) {
    return `This action removes a #${id} vtpass`;
  }
}
