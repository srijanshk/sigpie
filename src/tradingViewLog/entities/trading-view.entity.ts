import {
  BelongsTo,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Signal } from 'src/signal/entities/signal.entity';
import { User } from 'src/users/entities/user.entity';

@Table({ tableName: 'trading-view-log' })
export class TradingViewLog extends Model<TradingViewLog> {
  @Column({ primaryKey: true })
  id: number;

  @Column({ type: DataType.JSON, allowNull: true })
  meta: any | null;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @ForeignKey(() => Signal)
  @Column({ type: DataType.INTEGER, allowNull: false })
  signalId: number;

  @BelongsTo(() => User)
  signal: Signal;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
