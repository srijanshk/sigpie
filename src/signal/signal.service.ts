import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TradingViewLogService } from 'src/tradingViewLog/trading-view-log.service';

@Injectable()
export class SignalService {
  constructor(private tradingViewLogService: TradingViewLogService) {}
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
      console.log(data)
      await this.tradingViewLogService.create(data);
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
