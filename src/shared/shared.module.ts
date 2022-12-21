import { Global, Module } from '@nestjs/common';
import { SharedConfigService } from './config/config.service';

@Global()
@Module({
  providers: [SharedConfigService],
  exports: [SharedConfigService],
  imports: [],
  controllers: [],
})
export class SharedModule {}
