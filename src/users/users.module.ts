import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User } from './entities/user.entity';
import { DatabaseModule } from 'src/database/database.module';
import { usersProviders } from './users.provider';

@Module({
  imports: [
    DatabaseModule
  ],
  controllers: [UsersController],
  providers: [UsersService,...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
