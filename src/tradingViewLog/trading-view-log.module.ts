import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { TradingViewLog } from './entities/trading-view.entity';
import { TradingViewLogService } from './trading-view-log.service';

@Module({
  imports: [TypeOrmModule.forFeature([TradingViewLog])],
  controllers: [],
  providers: [IsExist, IsNotExist, TradingViewLogService],
  exports: [TradingViewLogService],
})
export class TradingViewLogModule {}
