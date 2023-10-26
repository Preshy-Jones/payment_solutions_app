// import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Services } from 'src/common/types/service.type';
// import { FlutterwaveService } from 'src/flutterwave/flutterwave.service';
// import { getRequestId } from 'src/utils/random-generators';
// import { BuyElectricityDto } from 'src/vtpass/dto/buy-electricity.dto';
// import { VtpassService } from 'src/vtpass/vtpass.service';
// import { WalletService } from 'src/wallet/wallet.service';
// import { Connection, Repository } from 'typeorm';
// import { CreateElectricitybillDto } from './dto/create-electricitybill.dto';
// import { UpdateElectricitybillDto } from './dto/update-electricitybill.dto';
// import { Electricitybill } from './entities/electricitybill.entity';

// @Injectable()
// export class ElectricitybillService {
//   constructor(
//     private connection: Connection,
//     @InjectRepository(Electricitybill)
//     private airtimeRepository: Repository<Electricitybill>,
//     private readonly vtpassService: VtpassService,
//     private readonly flutterwaveService: FlutterwaveService,
//     private readonly walletService: WalletService,
//   ) {}

//   async buyElectricity(buyElectrictyDto: BuyElectricityDto, user) {
//     const queryRunner = this.connection.createQueryRunner();
//     await queryRunner.connect();
//     await queryRunner.startTransaction();
//     try {
//       const email = user.email;
//       const variations = await this.vtpassService.getVariationCodes(
//         buyElectrictyDto.serviceID,
//       );
//       const amount = buyElectrictyDto.amount;

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
//   customer: buyElectrictyDto.phone,
//   owner: user,
//   ownerid: user.id,
//   transactionReference: request_id,
//   service: Services.VTPASS,
//   amount: amount,
//   serviceID: buyElectrictyDto.serviceID,
//   variation_code: buyElectrictyDto.variation_code,
//   remarks: 'ElECTRICITY PURCHASE',
//   balance: walletResponse.data.balance,
// };

//       const airtime = await queryRunner.manager.create(
//         Electricitybill,
//         payload,
//       );
//       await queryRunner.manager.save(airtime);

//       buyElectrictyDto['request_id'] = request_id;
//       const purchaseResponse = await this.vtpassService.buyElectricity(
//         buyElectrictyDto,
//       );
//       if (!purchaseResponse['content']['transactions']) {
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
//         message: 'Electricity Bill completed successfully',
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

//   buyElectricityUnits;
//   verifyBillStatus;
//   getAllElectricityBills;
//   getElectricityBillByOwnerId;
// }
