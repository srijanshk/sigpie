import { Inject, Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User')
    private usersModel: typeof User,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersModel.create({ ...createProfileDto });
  }

  findOne(fields: WhereOptions) {
    return this.usersModel.findOne({
      where: fields,
    });
  }

  findAll() {
    return this.usersModel.findAll();
  }

  async update(id: number, updateProfileDto: UpdateUserDto) {
    await this.usersModel.update(
      {
        ...updateProfileDto,
      },
      { where: { id: id } },
    );
    return this.findOne({ id: id });
  }

  async softDelete(id: number): Promise<void> {
    await this.usersModel.destroy({ where: { id } });
  }
}
