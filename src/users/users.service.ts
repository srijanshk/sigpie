import { Inject, Injectable } from '@nestjs/common';
import { Sequelize, WhereOptions } from 'sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Followers } from './entities/followers.entity';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('User')
    private usersModel: typeof User,

    @Inject('Followers')
    private followersModel: typeof Followers,
  ) {}

  create(createProfileDto: CreateUserDto) {
    return this.usersModel.create({ ...createProfileDto });
  }

  findOneWithId(id: number) {
    try {
      return this.usersModel.findOne({
        where: { id: id },
        attributes: [
          'id',
          'email',
          'userName',
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM followers as "Followers" WHERE ("Followers"."followerId" = ${id}))`,
            ),
            'followerCount',
          ],
          [
            Sequelize.literal(
              `(SELECT COUNT(*) FROM followers as "Followers" WHERE ("Followers"."followingId" = ${id}))`,
            ),
            'followingCount',
          ],
        ],
      });
    } catch (error) {
      console.log(error);
    }
  }

  findOne(fields: WhereOptions) {
    return this.usersModel.findOne({
      where: fields,
      include: [
        {
          model: User,
          as: 'Follower',
          foreignKey: 'followerId',
          required: false,
          // include: [{ model: User, as: 'Follower' }],
        },
        {
          model: User,
          as: 'Following',
          foreignKey: 'followingId',
          required: false,
          // include: [{ model: User, as: 'Following' }],
        },
      ],
    });
  }

  findAll() {
    return this.usersModel.findAll({
      where: { statusId: 1 },
      attributes: ['id', 'userName', 'email', 'firstName', 'lastName'],
      include: [
        {
          model: User,
          as: 'Follower',
          foreignKey: 'followerId',
          required: false,
          // include: [{ model: User, as: 'Follower' }],
        },
        {
          model: User,
          as: 'Following',
          foreignKey: 'followingId',
          required: false,
          // include: [{ model: User, as: 'Following' }],
        },
      ],
    });
  }

  async update(id: number, updateProfileDto: UpdateUserDto) {
    await this.usersModel.update(
      {
        ...updateProfileDto,
      },
      { where: { id: id } },
    );
    return this.findOne({ id: id });
  }

  async softDelete(id: number): Promise<void> {
    await this.usersModel.destroy({ where: { id } });
  }

  async getFollowers(userId: number): Promise<User[]> {
    return await User.findAll({
      include: [
        {
          model: User,
          as: 'Followers',
          where: { id: userId },
        },
      ],
    });
  }

  async getFollowing(userId: number): Promise<User[]> {
    return await User.findAll({
      include: [
        {
          model: User,
          as: 'Following',
          where: { id: userId },
        },
      ],
    });
  }

  async follow(followerId: number, followingId: number) {
    return await Followers.create({ followerId, followingId });
  }

  async unfollow(followerId: number, followingId: number) {
    return await Followers.destroy({ where: { followerId, followingId } });
  }
}
