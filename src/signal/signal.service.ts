import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TradingViewLog } from 'src/tradingViewLog/entities/Trading-view.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SignalService {

  constructor(
    @InjectRepository(TradingViewLog)
    private tradingViewRepository: Repository<TradingViewLog>
  ) {}
  async getSignalFromTA(data: any) {
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
      this.tradingViewRepository.create({meta: data})

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
