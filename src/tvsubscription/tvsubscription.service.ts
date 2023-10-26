// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Services } from 'src/common/types/service.type';
// import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
// import { getRequestId } from 'src/utils/random-generators';
// import { VtpassService } from 'src/vtpass/vtpass.service';
// import { WalletService } from 'src/wallet/wallet.service';
// import { Connection, Repository } from 'typeorm';
// import { BuyDSTVGOTV } from './dto/buy-dstv-gotv.dto';
// import { BuyShowmaxStartimesDto } from './dto/buy-startimes-showmax.dto';
// import { CreateTvsubscriptionDto } from './dto/create-tvsubscription.dto';
// import { UpdateTvsubscriptionDto } from './dto/update-tvsubscription.dto';
// import { Tvsubscription } from './entities/tvsubscription.entity';

// @Injectable()
// export class TvsubscriptionService {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(Tvsubscription)
//     private airtimeRepository: Repository<Tvsubscription>,
//     private readonly vtpassService: VtpassService,
//     private readonly flutterwaveService: FlutterwaveService,
//     private readonly walletService: WalletService,
//   ) {}

//     async bouquetChangeDSTV_GOTV(buyDSTVGOTV: BuyDSTVGOTV, user) {
//       const queryRunner = this.connection.createQueryRunner();

//       await queryRunner.connect();
//       await queryRunner.startTransaction();
//       try {
//         const email = user.email;
//         const variations = await this.vtpassService.getVariationCodes(
//           buyDSTVGOTV.serviceID,
//         );
//         const amount = parseInt(
//           variations['content']['varations'].find(
//             (variation) =>
//               variation['variation_code'] == buyDSTVGOTV.variation_code,
//           ).variation_amount,
//         );
//         const walletResponse = await this.walletService.removeMoney(
//           {
//             email,
//             amount,
//           },
//           queryRunner,
//         );
//         const request_id = await getRequestId();
//         const payload = {
//           customer: buyDSTVGOTV.phone,
//           owner: user,
//           ownerid: user.id,
//           transactionReference: request_id,
//           service: Services.VTPASS,
//           amount: amount,
//           serviceID: buyDSTVGOTV.serviceID,
//           variation_code: buyDSTVGOTV.variation_code,
//           remarks: 'TV SUBSCRIPTION',
//           balance: walletResponse.data.balance,
//           quantity: 1,
//           billersCode: buyDSTVGOTV.billersCode,
//         };

//         const tvsubscription = await queryRunner.manager.create(
//           Tvsubscription,
//           payload,
//         );
//         await queryRunner.manager.save(tvsubscription);

//         buyDSTVGOTV['request_id'] = request_id;
//         buyDSTVGOTV['quantity'] = 1;
//         const purchaseResponse = await this.vtpassService.bouquetChange(
//           buyDSTVGOTV,
//         );

//         if (purchaseResponse['content']['errors']) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: purchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         } else {
//           if (
//             purchaseResponse['content']['transactions']['status'] !== 'delivered'
//           ) {
//             throw new HttpException(
//               {
//                 status: HttpStatus.BAD_REQUEST,
//                 error: purchaseResponse['response_description'],
//               },
//               HttpStatus.BAD_REQUEST,
//             );
//           }
//         }

//         await queryRunner.commitTransaction();
//         //      return buyAirtimeDto;
//         return {
//           message: 'DSTV BOUQUET CHANGED',
//         };
//         return { email, amount };
//       } catch (err) {
//         // since we have errors lets rollback the changes we made
//         await queryRunner.rollbackTransaction();
//         throw err;
//       } finally {
//         // you need to release a queryRunner which was manually instantiated
//         await queryRunner.release();
//       }
//     }

//     async bouquetRenewDSTV_GOTV(buyDSTVGOTV: BuyDSTVGOTV, user) {
//       const queryRunner = this.connection.createQueryRunner();

//       await queryRunner.connect();
//       await queryRunner.startTransaction();
//       try {
//         const email = user.email;
//         const variations = await this.vtpassService.getVariationCodes(
//           buyDSTVGOTV.serviceID,
//         );
//         const amount = parseInt(
//           variations['content']['varations'].find(
//             (variation) =>
//               variation['variation_code'] == buyDSTVGOTV.variation_code,
//           ).variation_amount,
//         );
//         const walletResponse = await this.walletService.removeMoney(
//           {
//             email,
//             amount,
//           },
//           queryRunner,
//         );
//         const request_id = await getRequestId();
//         const payload = {
//           customer: buyDSTVGOTV.phone,
//           owner: user,
//           ownerid: user.id,
//           transactionReference: request_id,
//           service: Services.VTPASS,
//           amount: amount,
//           serviceID: buyDSTVGOTV.serviceID,
//           variation_code: buyDSTVGOTV.variation_code,
//           remarks: 'DSTV BOUQUET RENEWAL',
//           balance: walletResponse.data.balance,
//           quantity: 1,
//           billersCode: buyDSTVGOTV.billersCode,
//         };

//         const tvsubscription = await queryRunner.manager.create(
//           Tvsubscription,
//           payload,
//         );
//         await queryRunner.manager.save(tvsubscription);

//         buyDSTVGOTV['request_id'] = request_id;
//         buyDSTVGOTV['quantity'] = 1;
//         const purchaseResponse = await this.vtpassService.bouquetChange(
//           buyDSTVGOTV,
//         );

//         if (purchaseResponse['content']['errors']) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: purchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         } else {
//           if (
//             purchaseResponse['content']['transactions']['status'] !== 'delivered'
//           ) {
//             throw new HttpException(
//               {
//                 status: HttpStatus.BAD_REQUEST,
//                 error: purchaseResponse['response_description'],
//               },
//               HttpStatus.BAD_REQUEST,
//             );
//           }
//         }

//         await queryRunner.commitTransaction();
//         //      return buyAirtimeDto;
//         return {
//           message: 'DSTV BOUQUET RENEWED',
//         };
//         return { email, amount };
//       } catch (err) {
//         // since we have errors lets rollback the changes we made
//         await queryRunner.rollbackTransaction();
//         throw err;
//       } finally {
//         // you need to release a queryRunner which was manually instantiated
//         await queryRunner.release();
//       }
//     }

//     async buyStartimes(buyShowmaxStartimesDto: BuyShowmaxStartimesDto, user) {
//       const queryRunner = this.connection.createQueryRunner();

//       await queryRunner.connect();
//       await queryRunner.startTransaction();
//       try {
//         const email = user.email;
//         const variations = await this.vtpassService.getVariationCodes(
//           buyShowmaxStartimesDto.serviceID,
//         );
//         const amount = parseInt(
//           variations['content']['varations'].find(
//             (variation) =>
//               variation['variation_code'] ==
//               buyShowmaxStartimesDto.variation_code,
//           ).variation_amount,
//         );
//         const walletResponse = await this.walletService.removeMoney(
//           {
//             email,
//             amount,
//           },
//           queryRunner,
//         );
//         const request_id = await getRequestId();
//         const payload = {
//           customer: buyShowmaxStartimesDto.phone,
//           owner: user,
//           ownerId: user.id,
//           transactionReference: request_id,
//           service: Services.VTPASS,
//           amount: amount,
//           serviceID: buyShowmaxStartimesDto.serviceID,
//           variation_code: buyShowmaxStartimesDto.variation_code,
//           remarks: 'STARTIMES PURCHASE',
//           balance: walletResponse.data.balance,
//           quantity: 1,
//           billersCode: buyShowmaxStartimesDto.billersCode,
//         };

//         const tvsubscription = await queryRunner.manager.create(
//           Tvsubscription,
//           payload,
//         );
//         await queryRunner.manager.save(tvsubscription);

//         buyShowmaxStartimesDto['request_id'] = request_id;
//         buyShowmaxStartimesDto['quantity'] = 1;
//         const purchaseResponse = await this.vtpassService.buyStartimes(
//           buyShowmaxStartimesDto,
//         );

//         if (purchaseResponse['content']['errors']) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: purchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         } else {
//           if (
//             purchaseResponse['content']['transactions']['status'] !== 'delivered'
//           ) {
//             throw new HttpException(
//               {
//                 status: HttpStatus.BAD_REQUEST,
//                 error: purchaseResponse['response_description'],
//               },
//               HttpStatus.BAD_REQUEST,
//             );
//           }
//         }

//         await queryRunner.commitTransaction();
//         //      return buyAirtimeDto;
//         return {
//           message: 'Startimes Purchase completed successfully',
//         };
//         return { email, amount };
//       } catch (err) {
//         // since we have errors lets rollback the changes we made
//         await queryRunner.rollbackTransaction();
//         throw err;
//       } finally {
//         // you need to release a queryRunner which was manually instantiated
//         await queryRunner.release();
//       }
//     }
//     async buyShowmax(buyShowmaxStartimesDto: BuyShowmaxStartimesDto, user) {
//       const queryRunner = this.connection.createQueryRunner();

//       await queryRunner.connect();
//       await queryRunner.startTransaction();
//       try {
//         const email = user.email;
//         const variations = await this.vtpassService.getVariationCodes(
//           buyShowmaxStartimesDto.serviceID,
//         );
//         const amount = parseInt(
//           variations['content']['varations'].find(
//             (variation) =>
//               variation['variation_code'] ==
//               buyShowmaxStartimesDto.variation_code,
//           ).variation_amount,
//         );
//         const walletResponse = await this.walletService.removeMoney(
//           {
//             email,
//             amount,
//           },
//           queryRunner,
//         );
//         const request_id = await getRequestId();
//         const payload = {
//           customer: buyShowmaxStartimesDto.phone,
//           owner: user,
//           ownerId: user.id,
//           transactionReference: request_id,
//           service: Services.VTPASS,
//           amount: amount,
//           serviceID: buyShowmaxStartimesDto.serviceID,
//           variation_code: buyShowmaxStartimesDto.variation_code,
//           remarks: 'SHOWMAX PURCHASE',
//           balance: walletResponse.data.balance,
//           quantity: 1,
//           billersCode: buyShowmaxStartimesDto.billersCode,
//         };

//         const tvsubscription = await queryRunner.manager.create(
//           Tvsubscription,
//           payload,
//         );
//         await queryRunner.manager.save(tvsubscription);

//         buyShowmaxStartimesDto['request_id'] = request_id;
//         buyShowmaxStartimesDto['quantity'] = 1;
//         const purchaseResponse = await this.vtpassService.buyStartimes(
//           buyShowmaxStartimesDto,
//         );

//         if (purchaseResponse['content']['errors']) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: purchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         } else {
//           if (
//             purchaseResponse['content']['transactions']['status'] !== 'delivered'
//           ) {
//             throw new HttpException(
//               {
//                 status: HttpStatus.BAD_REQUEST,
//                 error: purchaseResponse['response_description'],
//               },
//               HttpStatus.BAD_REQUEST,
//             );
//           }
//         }

//         await queryRunner.commitTransaction();
//              return buyAirtimeDto;
//         return {
//           message: 'Showmax Purchase completed successfully',
//         };
//         return { email, amount };
//       } catch (err) {
//         since we have errors lets rollback the changes we made
//         await queryRunner.rollbackTransaction();
//         throw err;
//       } finally {
//         you need to release a queryRunner which was manually instantiated
//         await queryRunner.release();
//       }
//     }

//     createTvSubscription;
//     getAllTvSubscription;
//     getTvSubscriptionById;
//     getTvSubscrioptionByOwnerId;
//     addTvSubscription;
// }
