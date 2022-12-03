import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { userInfo } from 'os';
import { AuthService } from 'src/auth/auth.service';
import { TradingViewLogService } from 'src/tradingViewLog/trading-view-log.service';
import { User } from 'src/users/entities/user.entity';
import { Equal, Not, Repository } from 'typeorm';
import { CreateSignalDto, CreateSignalPayload } from './dto/create-signal.dto';
import {
  CreateTradingViewLog,
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

    @InjectRepository(SignalData)
    private signalDataRepository: Repository<SignalData>,

    @InjectRepository(UserSignalToken)
    private signalUserTokenRepository: Repository<UserSignalToken>,

    @InjectRepository(Signal)
    private signalRepository: Repository<Signal>,
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
            user: isExisting.user,
            signal: isExisting.signal,
          } as CreateTradingViewLog;

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

      const signalData = this.signalDataRepository.create({ ...dataPayload });
      await this.signalDataRepository.save(signalData);

      if (signalData) {
        const payload = {
          signalName: createSignal.signalName,
          signalDescription: createSignal.signalDescription,
          signalData: signalData,
          winRate: null,
          privacy: createSignal.privacy,
          owner: createSignal.owner,
          price: createSignal.price,
          status: createSignal.status,
        };

        const signal = this.signalRepository.create(payload);
        const signalResponse = await this.signalRepository.save(signal);

        if (signal) {
          const token = this.authService.createToken(
            createSignal.owner.id,
            signal.id,
          );
          const userTokenPayload = {
            user: createSignal.owner,
            signal,
            token,
          };

          const userSignalToken =
            this.signalUserTokenRepository.create(userTokenPayload);
          const tokenResponse = await this.signalUserTokenRepository.save(
            userSignalToken,
          );
          return {
            signal: signalResponse,
            token: tokenResponse.token,
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
    return this.signalRepository.createQueryBuilder(
      "signal"
    )
    .leftJoin("signal.owner", "owner")
    .where("owner.id = :userId", {userId: user.id})
    .execute()
  }

  async getSignalById(id: number): Promise<Signal> {
    return this.signalRepository.findOneBy({id})
  }
}
