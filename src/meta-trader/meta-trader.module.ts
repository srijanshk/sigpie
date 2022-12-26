import { Module } from '@nestjs/common';
import { MetaTraderController } from './meta-trader.controller';

@Module({
  providers: [MetaTraderController],
})
export class MetaTraderModule {}
