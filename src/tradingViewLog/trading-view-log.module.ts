import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { TradingViewLog } from './entities/trading-view.entity';
import { TradingViewLogService } from './trading-view-log.service';

@Module({
  imports: [
    DatabaseModule,
    // SequelizeModule.forFeature([TradingViewLog])
  ],
  controllers: [],
  providers: [
    TradingViewLogService,
    { provide: 'TradingViewLog', useValue: TradingViewLog },
  ],
  exports: [TradingViewLogService],
})
export class TradingViewLogModule {}
