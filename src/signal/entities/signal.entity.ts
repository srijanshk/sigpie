import { BelongsTo, Column, CreatedAt, DataType, DeletedAt, ForeignKey, Model, Table, UpdatedAt } from 'sequelize-typescript';
import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { SignalData } from './signal-data.entity';

export enum SignalPrivacy {
    Private = "private",
    Public = "public",
    Followers = "followers"
}

@Table({ tableName: 'signal' })
export class Signal extends Model<Signal> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  ownerId: number

  @BelongsTo(() => User)
  owner: User;

  @Column({ type: DataType.STRING, allowNull: false })
  signalName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  signalDescription: string;
  
  @Column({ type: DataType.INTEGER, allowNull: true })
  price: number;

  @Column({ type: DataType.INTEGER, allowNull: true })
  winRate: number;

  @Column({ type: DataType.ENUM({
    values: ['public', 'private', 'followers']
  }) , allowNull: false })
  privacy: string;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @ForeignKey(() => SignalData)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  signalDataId: number

  @BelongsTo(() => SignalData)
  signalData: SignalData;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
