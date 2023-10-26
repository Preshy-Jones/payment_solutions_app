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
// import { TvsubscriptionService } from './tvsubscription.service';
// import { CreateTvsubscriptionDto } from './dto/create-tvsubscription.dto';
// import { UpdateTvsubscriptionDto } from './dto/update-tvsubscription.dto';
// import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';
// import { BuyDSTVGOTV } from './dto/buy-dstv-gotv.dto';
// import { BuyShowmaxStartimesDto } from './dto/buy-startimes-showmax.dto';

// @Controller('tvsubscription')
// export class TvsubscriptionController {
//   constructor(private readonly tvsubscriptionService: TvsubscriptionService) {}

//   @UseGuards(JwtAuthGaurd)
//   @Post('bouquet_change_dstv_gotv')
//   bouquetChangeDSTV_GOTV(@Body() BuyDSTVGOTV: BuyDSTVGOTV, @Req() req) {
//     return this.tvsubscriptionService.bouquetChangeDSTV_GOTV(
//       BuyDSTVGOTV,
//       req.user,
//     );
//   }

//   @UseGuards(JwtAuthGaurd)
//   @Post('bouquet_renew_dstv_gotv')
//   bouquetRenewDSTV_GOTV(@Body() BuyDSTVGOTV: BuyDSTVGOTV, @Req() req) {
//     return this.tvsubscriptionService.bouquetRenewDSTV_GOTV(
//       BuyDSTVGOTV,
//       req.user,
//     );
//   }

//   @UseGuards(JwtAuthGaurd)
//   @Post('buy_startimes')
//   buyStartimes(
//     @Body() buyShowmaxStartimesDto: BuyShowmaxStartimesDto,
//     @Req() req,
//   ) {
//     return this.tvsubscriptionService.buyStartimes(
//       buyShowmaxStartimesDto,
//       req.user,
//     );
//   }

//   @UseGuards(JwtAuthGaurd)
//   @Post('buy_showmax')
//   buyShowmax(
//     @Body() buyShowmaxStartimesDto: BuyShowmaxStartimesDto,
//     @Req() req,
//   ) {
//     return this.tvsubscriptionService.buyShowmax(
//       buyShowmaxStartimesDto,
//       req.user,
//     );
//   }
// }
