import {
  Table,
  Column,
  Model,
  DataType,
  AfterCreate,
} from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';
import appConfig from '../../config/app.config';

@Table({ tableName: 'files' })
export class File extends Model<File> {
  @ApiProperty({ example: 'cbcfa8b8-3a25-4adb-a9c6-e325f0d0f3ae' })
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
    primaryKey: true,
  })
  id: string;

  @Allow()
  @Column({ type: DataType.STRING })
  path: string;

  @AfterCreate
  static updatePath(file: File) {
    if (file.path.indexOf('/') === 0) {
      file.path = appConfig().backendDomain + file.path;
    }
  }
}
