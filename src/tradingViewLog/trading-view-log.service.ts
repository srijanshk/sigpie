import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TradingViewLog } from './entities/trading-view.entity';

@Injectable()
export class TradingViewLogService {

  constructor(
    @InjectRepository(TradingViewLog)
    private tradingViewRepository: Repository<TradingViewLog>
  ) {}
  
  async create(data: any) {
    try {
      // if (data.auth) {
      //   console.log(data)
      // } else {
      //   throw new HttpException(
      //     {
      //       status: HttpStatus.UNAUTHORIZED,
      //       errors: "Auth Not Found"
      //     },
      //     HttpStatus.UNAUTHORIZED,
      //   );
      // }
      console.log(data)
      const payload = {
        meta: data
      }

      return this.tradingViewRepository.save(
        this.tradingViewRepository.create(payload)
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
