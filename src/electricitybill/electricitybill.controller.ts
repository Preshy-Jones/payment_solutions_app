// import {
//   Controller,
//   Get,
//   Post,
//   Body,
//   Patch,
//   Param,
//   Delete,
//   UseGuards,
//   Req,
// } from '@nestjs/common';
// import { ElectricitybillService } from './electricitybill.service';
// import { CreateElectricitybillDto } from './dto/create-electricitybill.dto';
// import { UpdateElectricitybillDto } from './dto/update-electricitybill.dto';
// import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';
// import { BuyDataDto } from 'src/vtpass/dto/buy-data.dto';
// import { BuyElectricityDto } from 'src/vtpass/dto/buy-electricity.dto';

// @Controller('electricitybill')
// export class ElectricitybillController {
//   constructor(
//     private readonly electricitybillService: ElectricitybillService,
//   ) {}

//   @UseGuards(JwtAuthGaurd)
//   @Post('buy_electricity')
//   buyAirtimeVtpass(@Body() buyElectrictyDto: BuyElectricityDto, @Req() req) {
//     return this.electricitybillService.buyElectricity(
//       buyElectrictyDto,
//       req.user,
//     );
//   }
// }
