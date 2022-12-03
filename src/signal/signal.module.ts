import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SignalController } from './signal.controller';
import { IsExist } from 'src/utils/validators/is-exists.validator';
import { IsNotExist } from 'src/utils/validators/is-not-exists.validator';
import { SignalService } from './signal.service';
import { TradingViewLogModule } from 'src/tradingViewLog/trading-view-log.module';
import { Signal } from './entities/signal.entity';
import { SignalData } from './entities/signal-data.entity';
import { UserSignalToken } from './entities/user-signal-token.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SignalData]),
    TypeOrmModule.forFeature([Signal]),
    TypeOrmModule.forFeature([UserSignalToken]),
    TradingViewLogModule,
    AuthModule
  ],
  controllers: [SignalController],
  providers: [IsExist, IsNotExist, SignalService],
  exports: [SignalService],
})
export class SignalModule {}
