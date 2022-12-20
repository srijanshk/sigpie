import { Inject, Injectable } from '@nestjs/common';
import { WhereOptions } from 'sequelize';
import { ForgotInput } from './dto/forgot-input';
import { Forgot } from './entities/forgot.entity';

@Injectable()
export class ForgotService {
  constructor(
    @Inject('Forgot')
    private forgotRepository: typeof Forgot,
  ) {}

  async findOne(fields: WhereOptions) {
    return this.forgotRepository.findOne({
      where: fields,
    });
  }

  async create(data: ForgotInput) {
    return this.forgotRepository.create({ ...data });
  }

  async softDelete(id: number): Promise<void> {
    await this.forgotRepository.destroy({ where: { id } });
  }
}
