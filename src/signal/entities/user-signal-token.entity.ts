import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { Signal } from './signal.entity';

@Table({ tableName: 'user-signal-token' })
export class UserSignalToken extends Model<UserSignalToken> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Signal)
  @Column({ type: DataType.INTEGER, allowNull: false })
  signalId: number;

  @BelongsTo(() => User)
  signal: Signal;

  @Column({ type: DataType.STRING, allowNull: false })
  token: string;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
