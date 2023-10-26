import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  UseGuards,
} from '@nestjs/common';
import { TransfersService } from './transfers.service';
import { CreateTransferDto } from './dto/create-transfer.dto';
import { UpdateTransferDto } from './dto/update-transfer.dto';
import { JwtAuthGaurd } from '../common/gaurds/jwt-auth.gaurd';
import { HandleTransferRequestDto } from './dto/handle-transfer-request.dto';

@Controller('transfers')
export class TransfersController {
  constructor(private readonly transfersService: TransfersService) {}

  @UseGuards(JwtAuthGaurd)
  @Post()
  transfer(@Body() createTransferDto, @Request() req) {
    return this.transfersService.transferFunds({
      ...createTransferDto,
      senderEmail: req.user.user.email,
    });
  }

  @UseGuards(JwtAuthGaurd)
  @Post('transfer_request')
  transferRequest(@Body() createTransferRequestDto, @Request() req) {
    return this.transfersService.transferRequest({
      ...createTransferRequestDto,
      recipientEmail: req.user.user.email,
    });
  }

  @UseGuards(JwtAuthGaurd)
  @Post('handle_transfer_request')
  handleTransferRequest(@Body() handleTransferRequestDto, @Request() req) {
    return this.transfersService.handleTransferRequest({
      ...handleTransferRequestDto,
      senderDetails: { id: req.user.user.id, email: req.user.user.email },
    });
  }

  @UseGuards(JwtAuthGaurd)
  @Get('hello')
  testguard(@Request() req) {
    return req.user;
  }

  // @Get()
  // findAll() {
  //   return this.transfersService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.transfersService.findOne(+id);
  // }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateTransferDto: UpdateTransferDto,
  // ) {
  //   return this.transfersService.update(+id, updateTransferDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.transfersService.remove(+id);
  // }
}
