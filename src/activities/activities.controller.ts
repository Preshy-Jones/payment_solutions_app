import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';
import { ActivitiesService } from './activities.service';
import { BuyAirtimeDto } from './dto/buy-airtime.dto';
import { BuyDataDto } from './dto/buy-data.dto';
import { BuyDSTVGOTV } from './dto/buy-dstv-gotv.dto';
import { BuyElectricityDto } from './dto/buy-electricity.dto';
import { BuyShowmaxStartimesDto } from './dto/buy-startimes-showmax.dto';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';

@Controller('activities')
export class ActivitiesController {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @UseGuards(JwtAuthGaurd)
  @Post('buy_airtime')
  buyAirtime(@Body() buyAirtimeDto: BuyAirtimeDto, @Req() req) {
    return this.activitiesService.buyAirtimeVTPass(buyAirtimeDto, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('buy_electricity')
  buyElectricity(@Body() buyElectrictyDto: BuyElectricityDto, @Req() req) {
    return this.activitiesService.buyElectricity(buyElectrictyDto, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('buy_data')
  buyMobileData(@Body() buyDataDto: BuyDataDto, @Req() req) {
    return this.activitiesService.buyMobileData(buyDataDto, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('bouquet_change_dstv_gotv')
  bouquetChangeDSTV_GOTV(@Body() BuyDSTVGOTV: BuyDSTVGOTV, @Req() req) {
    return this.activitiesService.bouquetChangeDSTV_GOTV(BuyDSTVGOTV, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('bouquet_renew_dstv_gotv')
  bouquetRenewDSTV_GOTV(@Body() BuyDSTVGOTV: BuyDSTVGOTV, @Req() req) {
    return this.activitiesService.bouquetRenewDSTV_GOTV(BuyDSTVGOTV, req.user);
  }

  @UseGuards(JwtAuthGaurd)
  @Post('buy_startimes')
  buyStartimes(
    @Body() buyShowmaxStartimesDto: BuyShowmaxStartimesDto,
    @Req() req,
  ) {
    return this.activitiesService.buyStartimes(
      buyShowmaxStartimesDto,
      req.user,
    );
  }

  @UseGuards(JwtAuthGaurd)
  @Post('buy_showmax')
  buyShowmax(
    @Body() buyShowmaxStartimesDto: BuyShowmaxStartimesDto,
    @Req() req,
  ) {
    return this.activitiesService.buyShowmax(buyShowmaxStartimesDto, req.user);
  }

  @Post()
  create(@Body() createActivityDto: CreateActivityDto) {
    return this.activitiesService.create(createActivityDto);
  }

  @Get()
  findAll() {
    return this.activitiesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.activitiesService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateActivityDto: UpdateActivityDto,
  ) {
    return this.activitiesService.update(+id, updateActivityDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.activitiesService.remove(+id);
  }
}
