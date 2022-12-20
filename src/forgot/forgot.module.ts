import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { DatabaseModule } from 'src/database/database.module';
import { Forgot } from './entities/forgot.entity';
import { ForgotService } from './forgot.service';

@Module({
  imports: [DatabaseModule],
  providers: [ForgotService, { provide: 'Forgot', useValue: Forgot }],
  exports: [ForgotService],
})
export class ForgotModule {}
