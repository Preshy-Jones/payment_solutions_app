import { Module } from '@nestjs/common';
import { MonnifyService } from './monnify.service';
import { MonnifyController } from './monnify.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [MonnifyController],
  providers: [MonnifyService],
  exports: [MonnifyService],
})
export class MonnifyModule {}
