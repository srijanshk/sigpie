import { Injectable } from '@nestjs/common';
import { config } from '../../db/config';

@Injectable()
export class SharedConfigService {
  get sequelizeOrmConfig() {
    return config.database;
  }

  get jwtConfig() {
    return { privateKey: config.jwtPrivateKey };
  }
}
