import { HttpService } from '@nestjs/axios';
import {
  CACHE_MANAGER,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { Cache } from 'cache-manager';
import { CreateReservedAccountDto } from './dto/create-reserved-account.dto';
import { InitiateMNTransferDto } from './dto/initiate-transfer.dto';
import { TRANSACTION_STATUS } from 'src/common/types/status.type';

@Injectable()
export class MonnifyService {
  private authToken;
  private baseUrl;
  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.cacheManager
      .get('monnify_token')
      .then((res) => (this.authToken = res));
    this.baseUrl = this.configService.get('MONNIFY_BASE_URL');
  }
  getAllBanks;
  validateAccountWithBvn;
  validateAccountName;
  disburse;
  createVirtualAccount;
  handleWebHook;

  setRequestHeaders(token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }

  async authenticate() {
    try {
      if (this.authToken) {
        return {
          message: 'Token Available',
        };
      }

      const apiKey = this.configService.get('MONNIFY_APIKEY');
      const apiSecret = this.configService.get('MONNIFY_SECRET_KEY');

      const clientIdSecretInBase64 = Buffer.from(
        apiKey + ':' + apiSecret,
      ).toString('base64');

      const headers = {
        headers: {
          Authorization: `Basic ${clientIdSecretInBase64}`,
        },
      };

      const response = this.httpService
        .post(`${this.baseUrl}api/v1/auth/login`, null, headers)
        .pipe(
          map((res) => res.data),
          catchError((error) => {
            throw new HttpException(
              {
                status: error.response.status,
                message: error.response.data.responseMessage,
                code: error.response.data.responseCode,
              },
              error.response.status,
            );
          }),
        );

      const result = await lastValueFrom(response);

      console.log('starting api call...');
      /*await this.cacheManager.set('monnify_token', 'hi', {
        ttl: result.responseBody.expiresIn,
      });*/
      this.authToken = result.responseBody.accessToken;

      console.log('starting api call...');

      return result;
    } catch (error) {
      throw error;
    }
  }

  async handleResponse(result) {
    try {
      if (result.responseCode === '0') {
        if (result.responseBody.status) {
          if (
            result.responseBody.status === 'SUCCESS' ||
            result.responseBody.status === 'COMPLETED'
          ) {
            return {
              status: TRANSACTION_STATUS.COMPLETED,
              data: result.responseBody,
            };
          }

          if (
            result.responseBody.status === 'PENDING' ||
            result.responseBody.status === 'AWAITING_PROCESSING' ||
            result.responseBody.status === 'IN_PROGRESS'
          ) {
            return {
              status: TRANSACTION_STATUS.IN_PROGRESS,
              data: result.responseBody,
            };
          }

          if (result.responseBody.status === 'PENDING_AUTHORIZATION') {
            return {
              status: TRANSACTION_STATUS.PENDING_AUTH,
              data: result.responseBody,
            };
          }

          if (result.responseBody.status === 'REVERSED') {
            return {
              status: TRANSACTION_STATUS.REVERSED,
              data: result.responseBody,
            };
          }
        }

        return {
          data: result.responseBody,
        };
      }

      if (
        result.responseCode === 'D01' ||
        result.responseCode === 'D02' ||
        result.responseCode === 'D03' ||
        result.responseCode === 'D04'
      ) {
        throw new HttpException(result.responseMessage, HttpStatus.BAD_REQUEST);
      }

      if (result.responseCode === '99') {
        return {
          status: TRANSACTION_STATUS.PENDING_REQUERY,
        };
      }
    } catch (error) {
      throw error;
    }
  }

  async getAllBankCodes() {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(`${this.baseUrl}api/v1/banks`, headers)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.status,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return result;
  }

  async validateAccountNumber({ accountNumber, bankCode }) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(
        `api/v1/disbursements/account/validate?accountNumber=${accountNumber}&bankCode=${bankCode}`,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return await this.handleResponse(result);
  }

  async createReservedAccount(
    createReservedAccountDto: CreateReservedAccountDto,
  ) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .post(
        `${this.baseUrl}api/v2/bank-transfer/reserved-accounts`,
        createReservedAccountDto,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return await this.handleResponse(result);
  }

  async deleteReservedAccount(reference: string) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .delete(
        `${this.baseUrl}api/v1/bank-transfer/reserved-accounts/reference/${reference}`,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return result;
  }

  async getReservedAccountTransactions(reference) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(
        `${this.baseUrl}api/v1/bank-transfer/reserved-accounts/transactions
    ?accountReference=${reference}`,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return result;
  }

  async initiateTransfers(initiateTransferDto: InitiateMNTransferDto) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const sourceNumber = '2953846525';

    const response = this.httpService
      .post(
        `${this.baseUrl}api/v2/disbursements/single`,
        { ...initiateTransferDto, sourceAccountNumber: sourceNumber },
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return await this.handleResponse(result);
  }

  async getWalletBalance(accountNumber: string) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(
        `${this.baseUrl}api/v2/disbursements/wallet-balance?accountNumber=${accountNumber}`,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return result.responseBody.availableBalance;
  }

  async listAllTransfers() {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(`${this.baseUrl}api/v2/disbursements/single/transactions`, headers)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return result;
  }

  async getTransactionStatus(reference) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const response = this.httpService
      .get(
        `${this.baseUrl}/api/v2/disbursements/single/summary?reference=${reference}`,
        headers,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return this.handleResponse(result);
  }

  async validateAccountBvnMatch({ accountNumber, bankCode, bvn }) {
    await this.authenticate();

    const headers = this.setRequestHeaders(this.authToken);

    const payload = {
      bankCode,
      accountNumber,
      bvn,
    };

    const response = this.httpService
      .post(`${this.baseUrl}/api/v1/vas/bvn-account-match`, payload, headers)
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            {
              status: error.response.status,
              message: error.response.data.responseMessage,
              code: error.response.data.responseCode,
            },
            error.response.statusCode,
          );
        }),
      );

    const result = await lastValueFrom(response);

    return await this.handleResponse(result);
  }
}
