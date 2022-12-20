import { Column, CreatedAt, DataType, DeletedAt, Model, Table, UpdatedAt } from 'sequelize-typescript';


@Table({ tableName: 'signal-data' })
export class SignalData extends Model<SignalData> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING , allowNull: false })
  ticker: string;

  @Column({ type: DataType.STRING , allowNull: false })
  actionType: string;
  
  @Column({ type: DataType.STRING , allowNull: false })
  orderType: string;

  @Column({ type: DataType.INTEGER , allowNull: false })
  stopLoss: number;
  
  @Column({ type: DataType.INTEGER , allowNull: false })
  takeProfit: number;

  @Column({ type: DataType.JSON , allowNull: false })
  meta: any;

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
