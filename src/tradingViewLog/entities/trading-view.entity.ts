import { Signal } from 'src/signal/entities/signal.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class TradingViewLog extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'json', nullable: true })
  meta: any | null;

  @ManyToOne(() => User, {
    eager: true,
  })
  user: User;

  @ManyToOne(() => Signal, {
    eager: true,
  })
  signal: Signal;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
