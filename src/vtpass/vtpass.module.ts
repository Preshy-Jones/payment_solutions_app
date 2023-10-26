import { Module } from '@nestjs/common';
import { VtpassService } from './vtpass.service';
import { VtpassController } from './vtpass.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [VtpassController],
  providers: [VtpassService],
  exports: [VtpassService],
})
export class VtpassModule {}
