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
// import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';
// import { Services, ServicesType } from 'src/common/types/service.type';
// import { AirtimeService } from './airtime.service';
// import { BuyAirtimeDto } from './dto/buy-airtime.dto';
// import { CreateAirtimeDto } from './dto/create-airtime.dto';
// import { UpdateAirtimeDto } from './dto/update-airtime.dto';
// import { ValidateAirtimeDto } from './dto/validate-airtime.dto';

// @Controller('airtime')
// export class AirtimeController {
//   constructor(private readonly airtimeService: AirtimeService) {}

//   @UseGuards(JwtAuthGaurd)
//   @Post('buy_airtime')
//   buyAirtimeVtpass(@Body() buyAirtimeDto: BuyAirtimeDto, @Req() req) {
//     return this.airtimeService.buyAirtimeVTPass(buyAirtimeDto, req.user);
//   }

//   /*@UseGuards(JwtAuthGaurd)
//   @Post('buy/:service')
//   buyAirtime(
//     @Body() buyAirtimeDto: BuyAirtimeDto,
//     @Param() params,
//     @Req() req,
//   ) {
//     return this.airtimeService.buyAirtime(
//       buyAirtimeDto,
//       params.service,
//       req.user,
//     );
//   }

//   /*@Get('providers/all/:service')
//   getAllProviders(@Param() params) {
//     return this.airtimeService.getAirtimeProviders(params.service);
//   }*/
// }
