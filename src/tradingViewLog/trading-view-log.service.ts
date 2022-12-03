import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTradingViewLog } from 'src/signal/dto/trading-view-log.dto';
import { Repository } from 'typeorm';
import { TradingViewLog } from './entities/trading-view.entity';

@Injectable()
export class TradingViewLogService {

  constructor(
    @InjectRepository(TradingViewLog)
    private tradingViewRepository: Repository<TradingViewLog>
  ) {}
  
  async create(data: CreateTradingViewLog) {
    try {
      return this.tradingViewRepository.save(
        this.tradingViewRepository.create({...data})
      )
      

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
