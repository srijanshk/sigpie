import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class SignalData extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  ticker: string;

  @Column({ nullable: false })
  actionType: string;
  
  @Column({ nullable: false })
  orderType: string;

  @Column({ nullable: false })
  stopLoss: number;
  
  @Column({ nullable: false })
  takeProfit: number;

  @Column({ type: 'json', nullable: true })
  meta: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
