import { Module } from '@nestjs/common';
import { TwillioService } from './twillio.service';
import { TwillioController } from './twillio.controller';

@Module({
  controllers: [TwillioController],
  providers: [TwillioService],
  exports: [TwillioService],
})
export class TwillioModule {}
