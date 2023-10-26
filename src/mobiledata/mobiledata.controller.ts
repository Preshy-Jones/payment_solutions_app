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
// import { MobiledataService } from './mobiledata.service';
// import { CreateMobiledatumDto } from './dto/create-mobiledatum.dto';
// import { UpdateMobiledatumDto } from './dto/update-mobiledatum.dto';
// import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';
// import { BuyDataDto } from './dto/buy-data.dto';

// @Controller('mobiledata')
// export class MobiledataController {
//   constructor(private readonly mobiledataService: MobiledataService) {}

//   @UseGuards(JwtAuthGaurd)
//   @Post('buy_data')
//   buyAirtimeVtpass(@Body() buyDataDto: BuyDataDto, @Req() req) {
//     return this.mobiledataService.buyMobileData(buyDataDto, req.user);
//   }
// }
