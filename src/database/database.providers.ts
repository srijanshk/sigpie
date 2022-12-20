import { Sequelize } from 'sequelize-typescript';
import { File } from 'src/files/entities/file.entity';
import { Forgot } from 'src/forgot/entities/forgot.entity';
import { Role } from 'src/roles/entities/role.entity';
import { SharedModule } from 'src/shared/shared.module';
import { SignalData } from 'src/signal/entities/signal-data.entity';
import { Signal } from 'src/signal/entities/signal.entity';
import { Status } from 'src/statuses/entities/status.entity';
import { TradingViewLog } from 'src/tradingViewLog/entities/trading-view.entity';
import { User } from 'src/users/entities/user.entity';
import { ConfigService } from './../shared/config/config.service';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    inject: [ConfigService],
    imports: [SharedModule],
    useFactory: (configService: ConfigService) => {
      const sequelize = new Sequelize(configService.sequelizeOrmConfig);
      sequelize.addModels([
        User,
        Signal,
        SignalData,
        TradingViewLog,
        Forgot,
        File,
        Status,
        Role,
      ]);
      return sequelize;
    },
  },
];
