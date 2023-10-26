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
  BadRequestException,
} from '@nestjs/common';
import { SmsService } from './sms.service';
import { ConfirmPhoneNumberDto } from './dto/confirm-phone-number.dto';
import { JwtAuthGaurd } from 'src/common/gaurds/jwt-auth.gaurd';

@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}
}
