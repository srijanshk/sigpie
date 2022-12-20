import { Table, Column, Model, DataType, ForeignKey, BelongsTo  } from 'sequelize-typescript';
import { ApiProperty } from '@nestjs/swagger';
import { Allow } from 'class-validator';

@Table({ tableName: 'role' })
export class Role extends Model<Role> {
  @ApiProperty({ example: 1 })
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Allow()
  @ApiProperty({ example: 'Admin' })
  @Column({ type: DataType.STRING })
  name?: string;
}
