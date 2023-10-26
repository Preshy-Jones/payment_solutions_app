import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VtpassService } from './vtpass.service';
import { CreateVtpassDto } from './dto/create-vtpass.dto';
import { UpdateVtpassDto } from './dto/update-vtpass.dto';
import { BuyAirtimeDto } from './dto/buy-airtime.dto';
import { BuyDataDto } from './dto/buy-data.dto';
import { QueryTransactionStatusDto } from './dto/query-transaction-status.dto';
import { VerifySmileEmailDto } from './dto/verify-smile-email.dto';
import { VerifySmilePhoneDto } from './dto/verify-smile-phone.dto';
import { VerifySmartCardDto } from './dto/verify-smart-card.dto';
import { BouquetChangeDto } from './dto/bouquet-change.dto';
import { BouquetRenewalDto } from './dto/bouquet-renewal.dto';
import { BuyShowmaxDto } from './dto/buy-showmax.dto';
import { BuyStartimesDto } from './dto/buy-startimes.dto';
import { BuyWAECDto } from './dto/buy-waec.dto';
import { BuyElectricityDto } from './dto/buy-electricity.dto';

@Controller('vtpass')
export class VtpassController {
  constructor(private readonly vtpassService: VtpassService) {}

  @Post('buy_airtime')
  buyAirtime(@Body() buyAirtimeDto: BuyAirtimeDto) {
    //    return getRequestId();
    return this.vtpassService.buyAirtime(buyAirtimeDto);
  }

  @Post('buy_data')
  buyData(@Body() buyDataDto: BuyDataDto) {
    return this.vtpassService.buyData(buyDataDto);
  }
  @Get('get_variation_codes/:serviceID')
  getVariationCode(@Param() params) {
    return this.vtpassService.getVariationCodes(params.serviceID);
  }

  @Get('vtpass_services_identifiers')
  getVtpassServicesIdentifiers() {
    return this.vtpassService.getVtpassServicesIdentifiers();
  }

  @Get('vtpass_service_ids/:identifier')
  getServiceIds(@Param() params) {
    return this.vtpassService.getServiceIds(params.identifier);
  }

  @Post('transaction_status')
  queryTransactionStatus(
    @Body() queryTransactionStatusDto: QueryTransactionStatusDto,
  ) {
    return this.vtpassService.queryTransactionStatus(queryTransactionStatusDto);
  }

  @Post('verify_smile_phone')
  verifySmilePhone(@Body() verifySmilePhoneDto: VerifySmilePhoneDto) {
    return this.vtpassService.verifySmilePhone(verifySmilePhoneDto);
  }

  @Post('verify_smile_email')
  verifySmileEmail(@Body() verifySmileEmailDto: VerifySmileEmailDto) {
    return this.vtpassService.verifySmileEmail(verifySmileEmailDto);
  }

  @Post('verify_smart_card')
  verifySmartCardNumber(@Body() verifySmartCardDto: VerifySmartCardDto) {
    return this.vtpassService.verifySmartCardNumber(verifySmartCardDto);
  }

  @Post('bouquet_change')
  changeBouquet(@Body() bouquetChangeDto: BouquetChangeDto) {
    return this.vtpassService.bouquetChange(bouquetChangeDto);
  }

  @Post('bouquet_renewal')
  renewBouquet(@Body() bouquetChangeDto: BouquetRenewalDto) {
    return this.vtpassService.bouquetRenewal(bouquetChangeDto);
  }

  @Post('buy_startimes')
  buyStartimes(@Body() buyStartimesDto: BuyStartimesDto) {
    return this.vtpassService.buyStartimes(buyStartimesDto);
  }

  @Post('buy_showmax')
  buyShowmax(@Body() buyShowmaxDto: BuyShowmaxDto) {
    return this.vtpassService.buyShowmax(buyShowmaxDto);
  }

  @Post('buy_waec')
  buyWAEC(@Body() buyWAECDto: BuyWAECDto) {
    return this.vtpassService.buyWAEC(buyWAECDto);
  }

  @Post('buy_electricity')
  buyElectricityDto(@Body() buyElectricityDto: BuyElectricityDto) {
    return this.vtpassService.buyElectricity(buyElectricityDto);
  }

  @Post()
  create(@Body() createVtpassDto: CreateVtpassDto) {
    return this.vtpassService.create(createVtpassDto);
  }

  @Get()
  findAll() {
    return this.vtpassService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.vtpassService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVtpassDto: UpdateVtpassDto) {
    return this.vtpassService.update(+id, updateVtpassDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.vtpassService.remove(+id);
  }
}
