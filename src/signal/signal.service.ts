import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { TradingViewLogService } from 'src/tradingViewLog/trading-view-log.service';
import { User } from 'src/users/entities/user.entity';
import { CreateSignalDto, CreateSignalPayload } from './dto/create-signal.dto';
import {
  CreateTradingViewLogInput,
  TradingViewLogInput,
} from './dto/trading-view-log.dto';
import { SignalData } from './entities/signal-data.entity';
import { Signal } from './entities/signal.entity';
import { UserSignalToken } from './entities/user-signal-token.entity';

@Injectable()
export class SignalService {
  constructor(
    private tradingViewLogService: TradingViewLogService,
    private authService: AuthService,

    @Inject('SignalData')
    private signalDataRepository: typeof SignalData,

    @Inject('UserSignalToken')
    private signalUserTokenRepository: typeof UserSignalToken,

    @Inject('Signal')
    private signalRepository: typeof Signal,
  ) {}

  async getSignalFromTA(data: TradingViewLogInput) {
    try {
      if (data.token) {
        const isExisting = await this.signalUserTokenRepository.findOne({
          where: { token: data.token },
        });
        if (isExisting) {
          const payload = {
            meta: data.meta,
            userId: isExisting.user.id,
            signalId: isExisting.signal.id,
          };

          console.log(payload);
          this.tradingViewLogService.create(payload);
        }
      } else {
        throw new HttpException(
          {
            status: HttpStatus.UNAUTHORIZED,
            errors: 'Auth Not Found',
          },
          HttpStatus.UNAUTHORIZED,
        );
      }
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

  async createSignal(createSignal: CreateSignalPayload) {
    try {
      const dataPayload = {
        ticker: createSignal.ticker,
        actionType: createSignal.actionType,
        meta: createSignal.meta,
        orderType: createSignal.orderType,
        stopLoss: createSignal.stopLoss,
        takeProfit: createSignal.takeProfit,
      };

      const signalData = await this.signalDataRepository.create({ ...dataPayload });

      if (signalData) {
        const payload = {
          signalName: createSignal.signalName,
          signalDescription: createSignal.signalDescription,
          signalDataId: signalData.id,
          winRate: null,
          privacy: createSignal.privacy,
          ownerId: createSignal.ownerId,
          price: createSignal.price,
          statusId: createSignal.statusId,
        };

        const signal = await this.signalRepository.create({...payload});

        if (signal) {
          const token = this.authService.createToken(
            signal.ownerId,
            signal.id,
          );
          const userTokenPayload = {
            userId: signal.ownerId,
            signalId: signal.id,
            token,
          };

          const userSignalToken =
            await this.signalUserTokenRepository.create({...userTokenPayload});
          return {
            signal: signal,
            token: userSignalToken.token,
          };
        }
      }
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

  async getAllSignal(user: User): Promise<Signal[]> {
    return await this.signalRepository.findAll({
      where: {
        ownerId: user.id
      }
    })
  }

  async getSignalById(id: number): Promise<Signal> {
    return this.signalRepository.findOne({where: { id }})
  }
}
