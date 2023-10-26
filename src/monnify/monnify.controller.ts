import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  CacheKey,
  CacheTTL,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { MonnifyService } from './monnify.service';
import { CreateMonnifyDto } from './dto/create-monnify.dto';
import { UpdateMonnifyDto } from './dto/update-monnify.dto';

@Controller('monnify')
export class MonnifyController {
  constructor(private readonly monnifyService: MonnifyService) {}
}
