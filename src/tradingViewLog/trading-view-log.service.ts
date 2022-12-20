import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { CreateTradingViewLogInput } from 'src/signal/dto/trading-view-log.dto';
import { TradingViewLog } from './entities/trading-view.entity';

@Injectable()
export class TradingViewLogService {
  constructor(
    @Inject('TradingViewLog')
    private tradingViewRepository: typeof TradingViewLog,
  ) {}

  async create(data: CreateTradingViewLogInput) {
    try {
      return this.tradingViewRepository.create({ ...data });
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.UNPROCESSABLE_ENTITY,
          errors: error,
        },
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }
}
