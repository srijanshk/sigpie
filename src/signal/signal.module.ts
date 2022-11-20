import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalController } from './signal.controller';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SignalService } from './signal.service';
import { TradingViewLogModule } from 'src/tradingViewLog/trading-view-log.module';

@Module({
  imports: [TradingViewLogModule],
  controllers: [SignalController],
  providers: [IsExist, IsNotExist, SignalService],
  exports: [SignalService],
})
export class SignalModule {}
