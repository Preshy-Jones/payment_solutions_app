// import { BuyAirtimeDto } from './dto/buy-airtime.dto';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Connection, Repository } from 'typeorm';
// import { Airtime } from './entities/airtime.entity';
// import { Services, ServicesType } from 'src/common/types/service.type';
// import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
// import { BillCategories } from 'src/common/types/bill-categories.type';
// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import {
//   getTransactionReference,
//   getRequestId,
// } from 'src/utils/random-generators';
// import { TransactionStatus } from 'src/common/types/status.type';
// import { WalletService } from 'src/wallet/wallet.service';
// import { VtpassService } from 'src/vtpass/vtpass.service';

// @Injectable()
// export class AirtimeService {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(Airtime) private airtimeRepository: Repository<Airtime>,
//     private readonly vtpassService: VtpassService,
//     private readonly flutterwaveService: FlutterwaveService,
//     private readonly walletService: WalletService,
//   ) {}

//   async buyAirtimeVTPass(buyAirtimeDto: BuyAirtimeDto, user) {
//     const queryRunner = this.connection.createQueryRunner();

//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       const amount = buyAirtimeDto['amount'];
//       const email = user.email;

//       const wallet = await this.walletService.getWalletByOwnerId(user.id);
//       if (wallet.balance < amount) {
//         throw new HttpException(
//           'Not enough funds in your wallet',
//           HttpStatus.BAD_REQUEST,
//         );
//       }

// const walletResponse = await this.walletService.removeMoney(
//   {
//     email,
//     amount,
//   },
//   queryRunner,
// );
// const request_id = await getRequestId();
// const payload = {
//   customer: buyAirtimeDto.phone,
//   owner: user,
//   ownerid: user.id,
//   transactionReference: request_id,
//   service: Services.VTPASS,
//   amount: buyAirtimeDto.amount,
//   serviceID: buyAirtimeDto.serviceID,
//   remarks: 'AIRTIME RECHARGE',
//   balance: walletResponse.data.balance,
// };

//       const airtime = await queryRunner.manager.create(Airtime, payload);
//       await queryRunner.manager.save(airtime);

//       buyAirtimeDto['request_id'] = request_id;
//       const airtimePurchaseResponse = await this.vtpassService.buyAirtime(
//         buyAirtimeDto,
//       );

//       if (airtimePurchaseResponse['content']['errors']) {
//         throw new HttpException(
//           {
//             status: HttpStatus.BAD_REQUEST,
//             error: airtimePurchaseResponse['response_description'],
//           },
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         if (
//           airtimePurchaseResponse['content']['transactions']['status'] !==
//           'delivered'
//         ) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: airtimePurchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         }
//       }

//       await queryRunner.commitTransaction();
//       //      return buyAirtimeDto;
//       return {
//         message: 'Airtime Purchase completed successfully',
//       };
//       return { email, amount };
//     } catch (err) {
//       // since we have errors lets rollback the changes we made
//       await queryRunner.rollbackTransaction();
//       throw err;
//     } finally {
//       // you need to release a queryRunner which was manually instantiated
//       await queryRunner.release();
//     }
//   }

// async buyAirtime(buyAirtimeDto: BuyAirtimeDto, service: ServicesType, user) {
//   const wallet = await this.walletService.getWalletByOwnerId(user.id);
//   //    return wallet.balance < parseInt(buyAirtimeDto.amount);
//   if (wallet.balance < buyAirtimeDto.amount) {
//     throw new HttpException(
//       'Not enough funds in your wallet',
//       HttpStatus.BAD_REQUEST,
//     );
//   }
//   let result;
//   const reference = await getTransactionReference();
//   switch (service) {
//     case Services.FLUTTERWAVE:
//       const payload = {
//         ...buyAirtimeDto,
//         reference,
//       };
//       const response = await this.flutterwaveService.createBill(payload);
//       if (response.status === 'success') {
//         const payload = {
//           customer: response.data.phoneNumber,
//           amount: response.data.amount,
//           ownerid: user.id,
//           merchantReference: response.data.tx_ref,
//           tapmoneyReference: reference,
//           service: Services.FLUTTERWAVE,
//           status: TransactionStatus.PENDING,
//           details: response.data,
//         };
//         const newData = await this.airtimeRepository.create(payload);
//         await this.airtimeRepository.save(newData);
//         return newData;
//       } else {
//         result = response;
//       }
//       break;
//   }
//   return result;
// }

//   async getAirtimeProviders(service: ServicesType) {
//     let result;
//     switch (service) {
//       case Services.FLUTTERWAVE:
//         result = await this.flutterwaveService.getAllBillCategories(
//           BillCategories.AIRTIME,
//         );
//     }
//     return result;
//   }*/

//   verifyAirtimeTransactionStatus;

//   getAlllAirtimeTransactions;

//   getAirtimeTransactionsByOwnerId;
// }
