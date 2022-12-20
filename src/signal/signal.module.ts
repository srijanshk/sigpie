import { Module } from '@nestjs/common';
import { SignalController } from './signal.controller';
import { SignalService } from './signal.service';
import { TradingViewLogModule } from 'src/tradingViewLog/trading-view-log.module';
import { Signal } from './entities/signal.entity';
import { SignalData } from './entities/signal-data.entity';
import { UserSignalToken } from './entities/user-signal-token.entity';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [
    DatabaseModule,
    // SequelizeModule.forFeature([SignalData]),
    // SequelizeModule.forFeature([Signal]),
    // SequelizeModule.forFeature([UserSignalToken]),
    TradingViewLogModule,
    AuthModule,
  ],
  controllers: [SignalController],
  providers: [
    SignalService,
    { provide: 'SignalData', useValue: SignalData },
    { provide: 'Signal', useValue: Signal },
    { provide: 'UserSignalToken', useValue: UserSignalToken },
  ],
  exports: [SignalService],
})
export class SignalModule {}
