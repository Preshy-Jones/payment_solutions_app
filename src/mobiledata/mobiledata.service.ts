// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Services } from 'src/common/types/service.type';
// import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
// import { getRequestId } from 'src/utils/random-generators';
// import { VtpassService } from 'src/vtpass/vtpass.service';
// import { WalletService } from 'src/wallet/wallet.service';
// import { Connection, Repository } from 'typeorm';
// import { BuyDataDto } from './dto/buy-data.dto';
// import { CreateMobiledatumDto } from './dto/create-mobiledatum.dto';
// import { UpdateMobiledatumDto } from './dto/update-mobiledatum.dto';
// import { Mobiledatum } from './entities/mobiledatum.entity';

// @Injectable()
// export class MobiledataService {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(Mobiledatum)
//     private airtimeRepository: Repository<Mobiledatum>,
//     private readonly vtpassService: VtpassService,
//     private readonly flutterwaveService: FlutterwaveService,
//     private readonly walletService: WalletService,
//   ) {}

//   async buyMobileData(buyDataDto: BuyDataDto, user) {
//     const queryRunner = this.connection.createQueryRunner();

//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       const email = user.email;
//       const variations = await this.vtpassService.getVariationCodes(
//         buyDataDto.serviceID,
//       );
//       const amount = parseInt(
//         variations['content']['varations'].find(
//           (variation) =>
//             variation['variation_code'] == buyDataDto.variation_code,
//         ).variation_amount,
//       );

// const wallet = await this.walletService.getWalletByOwnerId(user.id);
// if (wallet.balance < amount) {
//   throw new HttpException(
//     'Not enough funds in your wallet',
//     HttpStatus.BAD_REQUEST,
//   );
// }
// //      return amount;
// const walletResponse = await this.walletService.removeMoney(
//   {
//     email,
//     amount,
//   },
//   queryRunner,
// );
// const request_id = await getRequestId();
// const payload = {
//   customer: buyDataDto.phone,
//   owner: user,
//   ownerid: user.id,
//   transactionReference: request_id,
//   service: Services.VTPASS,
//   amount: amount,
//   serviceID: buyDataDto.serviceID,
//   variation_code: buyDataDto.variation_code,
//   remarks: 'DATA PURCHASE',
//   balance: walletResponse.data.balance,
// };

//       const airtime = await queryRunner.manager.create(Mobiledatum, payload);
//       await queryRunner.manager.save(airtime);

//       buyDataDto['request_id'] = request_id;
//       const purchaseResponse = await this.vtpassService.buyData(buyDataDto);

//       if (purchaseResponse['content']['errors']) {
//         throw new HttpException(
//           {
//             status: HttpStatus.BAD_REQUEST,
//             error: purchaseResponse['response_description'],
//           },
//           HttpStatus.BAD_REQUEST,
//         );
//       } else {
//         if (
//           purchaseResponse['content']['transactions']['status'] !== 'delivered'
//         ) {
//           throw new HttpException(
//             {
//               status: HttpStatus.BAD_REQUEST,
//               error: purchaseResponse['response_description'],
//             },
//             HttpStatus.BAD_REQUEST,
//           );
//         }
//       }

//       await queryRunner.commitTransaction();
//       //      return buyAirtimeDto;
//       return {
//         message: 'Data Purchase completed successfully',
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

//   verifyMobileDataTransactionStatus;
//   addMObileDtataTransaction;
//   getAllMobileDataTransactions;
//   getMobileDtatTransactionByOwnerId;
// }
