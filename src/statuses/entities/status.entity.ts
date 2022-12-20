import { Table, Column, Model, DataType, ForeignKey, BelongsTo  } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Table({ tableName: 'status' })

export class Status extends Model<Status> {
  @ApiProperty({ example: 1 })
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Allow()
  @ApiProperty({ example: 'Active' })
  @Column({ type: DataType.STRING })
  name: string;
}
