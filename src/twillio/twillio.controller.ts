import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { CreateTwillioDto } from './dto/create-twillio.dto';
import { UpdateTwillioDto } from './dto/update-twillio.dto';

@Controller('twillio')
export class TwillioController {
  constructor(private readonly twillioService: TwillioService) {}
}
