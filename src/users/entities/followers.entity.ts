import {
  Table,
  Column,
  Model,
  DataType,
  CreatedAt,
  UpdatedAt,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from './user.entity';

@Table({ tableName: 'followers' })
export class Followers extends Model<Followers> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  followerId: number;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER, allowNull: false })
  followingId: number;

  @BelongsTo(() => User, { as: 'Follower', foreignKey: 'followerId' })
  follower: User;
  
  @BelongsTo(() => User, { as: 'Following', foreignKey: 'followingId' })
  following: User;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;
}
