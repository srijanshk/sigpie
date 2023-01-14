import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  DeletedAt,
  UpdatedAt,
  BeforeCreate,
  BeforeUpdate,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { Status } from '../../statuses/entities/status.entity';
import { File } from '../../files/entities/file.entity';
import { AuthProvidersEnum } from 'src/auth/auth-providers.enum';
import * as bcrypt from 'bcryptjs';
import { Followers } from './followers.entity';

@Table({ tableName: 'users' })
export class User extends Model<User> {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  userName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @BeforeCreate
  @BeforeUpdate
  static async setPassword(user: User) {
    if (user.password) {
      const salt = await bcrypt.genSalt();
      user.password = await bcrypt.hash(user.password, salt);
    }
  }

  @Column({ type: DataType.STRING, defaultValue: AuthProvidersEnum.email })
  provider: string;

  @Column({ type: DataType.STRING, allowNull: true })
  socialId: string;

  @Column({ type: DataType.STRING, allowNull: true })
  firstName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: true })
  hash: string;

  @ForeignKey(() => File)
  @Column({
    type: DataType.UUID,
    allowNull: true,
  })
  photoId: string;

  @BelongsTo(() => File)
  photo?: File;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  roleId: number;

  @BelongsTo(() => Role)
  role: Role;

  @ForeignKey(() => Status)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  statusId: number;

  @BelongsTo(() => Status)
  status: Status;

  @BelongsToMany(() => User, { through: () => Followers, as: 'Follower', foreignKey: 'followerId' })
  followers: User[];
  
  @BelongsToMany(() => User, { through: () => Followers, as: 'Following', foreignKey: 'followingId' })
  following: User[];

  @CreatedAt public createdAt: Date;

  @UpdatedAt public updatedAt: Date;

  @DeletedAt public deletedAt: Date;
}
