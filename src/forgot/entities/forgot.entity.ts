import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';
import { Allow } from 'class-validator';

@Table({ tableName: 'forgot' })
export class Forgot extends Model<Forgot> {
  @Column({ autoIncrement: true, primaryKey: true })
  id: number;

  @Allow()
  @Column({ type: DataType.STRING, allowNull: false })
  hash: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
