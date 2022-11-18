import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Signal } from './signal.entity';

export enum SignalPrivacy {
    Private = "private",
    Public = "public",
    Followers = "followers"
}

@Entity()
export class SignalData extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, {
    eager: true,
  })
  signal: Signal;

  @Column({ nullable: false })
  ticker: string;

  @Column({ nullable: false })
  actionType: string;
  
  @Column({ nullable: false })
  OrderType: string;

  @Column({ nullable: false })
  stopLoss: string;
  
  @Column({ nullable: false })
  takeProfit: string;

  @Column({ type: 'json', nullable: true })
  meta: any;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
