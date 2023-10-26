import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom, map } from 'rxjs';
import { CreateBillDto } from './dto/create-bill.dto';
import { InitiateDepositDto } from './dto/initiate-deposit.dto';
import { BillCategories } from './interfaces/bills-categories';
import * as crypto from 'crypto';
import * as forge from 'node-forge';
import { AuthorizeDepositDto } from './dto/authorize-deposit.dto';
import { ValidateDepositDto } from './dto/validate-deposit.dto';
import { UssdDepositData } from './interfaces/deposits.interface';
import { UssdDepositDto } from './dto/ussd-deposit.dto';
import { InitiateWithdrawalDto } from './dto/initiate-withdrawal.dto';
import { InitiateWithdrawalData } from './interfaces/withdrawal.interface';
import { getTransactionReference } from 'src/utils/random-generators';
import { CreateReservedAccountDto } from './dto/create-reserved-account.dto';
import { compare } from 'bcrypt';
import * as Flutterwave from 'flutterwave-node-v3';
import { CURRENCY } from 'src/common/types/currency.type';

@Injectable()
export class FlutterwaveService {
  private flw: Flutterwave;
  private secretKey: string;
  private publicKey: string;
  private baseURI: string;
  private encryptKey: string;
  private requestHeaders;
  constructor(
    private readonly configService: ConfigService,
    private httpService: HttpService,
  ) {
    this.secretKey = this.configService.get('FLUTTERWAVE_SECRET_KEY');
    this.publicKey = this.configService.get('FLUTTERWAVE_PUBLIC_KEY');
    this.encryptKey = this.configService.get('FLUTTERWAVE_ENCRYPT_KEY');
    this.flw = new Flutterwave(this.publicKey, this.secretKey);
    this.requestHeaders = {
      headers: {
        Authorization: `Bearer ${this.secretKey}`,
      },
    };
  }

  async transfer(initiateWithdrawalDto: InitiateWithdrawalDto) {
    try {
      const result = await this.flw.Transfer.initiate(initiateWithdrawalDto);
      console.log(result);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getTransferStatus(id: number) {
    try {
      return await this.flw.Transfer.get_a_transfer({ id });
    } catch (error) {
      throw error;
    }
  }

  async getNairaWalletBalance() {
    try {
      const result = await this.flw.Misc.bal_currency({
        currency: CURRENCY.NAIRA,
      });
      return {
        nairaWalletBalance: result.data.available_balance,
      };
    } catch (error) {
      throw error;
    }
  }

  /*async getAllBillCategories(category: BillCategoryType) {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/bill-categories?${category}=1`,
        this.requestHeaders,
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );
    const categories = await lastValueFrom(response);
    if (categories.status === 'success') {
      return categories.data.filter((category) => category.country === 'NG');
    }
    return categories;
  }

  async validateBillService(
    itemCode: string,
    customerCode: string,
    billerCode: string,
  ) {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/bill-items/${itemCode}/validate?code=${billerCode}&customer=${customerCode}`,
        this.requestHeaders,
      )
      .pipe(
        map((response) => response.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );
    const result = await lastValueFrom(response);
    console.log(result);
  }

  async createBill(createBillDto: CreateBillDto) {
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/bills`,
        createBillDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async verifyBvn(bvn: string) {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/kyc/bvns/${bvn}`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async getBillPaymentStatus(verbose: boolean, reference: string) {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/bills/${reference}`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async verifyAccountNumber(accountNumber: string, bankCode: string) {
    const payload = {
      account_number: accountNumber,
      bank_code: bankCode,
    };
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/accounts/resolve`,
        payload,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async getAllBankCodes(country = 'NG') {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/banks/${country}`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async initiateCardDeposit(initiateDepositDto: InitiateDepositDto) {
    const reference = await getTransactionReference();
    const initiateDepositData = { ...initiateDepositDto, tx_ref: reference };
    const payload = {
      client: this.encrypt(JSON.stringify(initiateDepositData)),
    };
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/charges?type=card`,
        payload,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    const data = await lastValueFrom(response);
    return {
      request: payload,
      response: data,
    };
  }

  async authorizeCardDeposit(authorizeDepositDto: AuthorizeDepositDto) {
    const payload = {
      client: this.encrypt(JSON.stringify(authorizeDepositDto)),
    };
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/charges?type=card`,
        payload,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );
    return await lastValueFrom(response);
  }

  async validateCardDeposit(validateDepositDto: ValidateDepositDto) {
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/validate-charge`,
        validateDepositDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );
    return await lastValueFrom(response);
  }

  async verifyTransaction(id: string) {
    const response = this.httpService
      .get(
        `https://api.flutterwave.com/v3/transactions/${id}/verify`,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async initiateUssdDeposit(ussdDepositDto: UssdDepositDto) {
    const reference = await getTransactionReference();
    const ussdDepositData: UssdDepositData = {
      ...ussdDepositDto,
      tx_ref: reference,
    };
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/charges?type=ussd`,
        ussdDepositData,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async initiateWithdrawal(initiateWithdrawalDto: InitiateWithdrawalDto) {
    const reference = await getTransactionReference();
    const initiateWithdrawalData: InitiateWithdrawalData = {
      ...initiateWithdrawalDto,
      reference: reference,
    };
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/transfers`,
        initiateWithdrawalData,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async createReservedAccount(
    createReservedAccountDto: CreateReservedAccountDto,
  ) {
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/virtual-account-numbers`,
        createReservedAccountDto,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  async deleteReservedAccount(orderRef: string) {
    const response = this.httpService
      .post(
        `https://api.flutterwave.com/v3/virtual-account-numbers/${orderRef}`,
        null,
        this.requestHeaders,
      )
      .pipe(
        map((res) => res.data),
        catchError((error) => {
          throw new HttpException(
            error.response.data.message,
            error.response.status,
          );
        }),
      );

    return await lastValueFrom(response);
  }

  encrypt(text: string) {
    const cipher = forge.cipher.createCipher(
      '3DES-ECB',
      forge.util.createBuffer(this.encryptKey),
    );
    cipher.start({ iv: '' });
    cipher.update(forge.util.createBuffer(text, 'utf-8'));
    cipher.finish();
    const encrypted = cipher.output;
    return forge.util.encode64(encrypted.getBytes());
  }*/
}
