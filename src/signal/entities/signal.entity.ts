import { Status } from 'src/statuses/entities/status.entity';
import { User } from 'src/users/entities/user.entity';
import { EntityHelper } from 'src/utils/entity-helper';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { SignalData } from './signal-data.entity';

export enum SignalPrivacy {
    Private = "private",
    Public = "public",
    Followers = "followers"
}

@Entity()
export class Signal extends EntityHelper {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, {
    eager: true,
  })
  owner: User;

  @Column({ nullable: false })
  signalName: string;

  @Column({ nullable: true })
  signalDescription: string;
  
  @Column({ nullable: true })
  price?: number | null;

  @Column({ nullable: true })
  winRate?: number | null;

  @Column({ type: "enum" , enum: SignalPrivacy, nullable: false })
  privacy: string;

  @ManyToOne(() => Status, {
    eager: true,
  })
  status?: Status;

  @OneToOne(() => SignalData, {
    eager: true,
  })
  @JoinColumn()
  signalData: SignalData;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
