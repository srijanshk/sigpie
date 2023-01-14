import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  HttpStatus,
  HttpCode,
  Get,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/roles/roles.decorator';
import { RoleEnum } from 'src/roles/roles.enum';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/roles/roles.guard';
import { User } from './entities/user.entity';

@ApiBearerAuth()
@Roles(RoleEnum.admin)
@UseGuards(AuthGuard('jwt'), RolesGuard)
@ApiTags('Users')
@Controller({
  path: 'users',
  version: '1',
})
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createProfileDto: CreateUserDto) {
    return this.usersService.create(createProfileDto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id') id: number, @Body() updateProfileDto: UpdateUserDto) {
    return this.usersService.update(id, updateProfileDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.softDelete(id);
  }

  @Get(':id/followers')
  @HttpCode(HttpStatus.OK)
  async getFollowers(@Param('id') userId: number): Promise<User[]> {
    return await this.usersService.getFollowers(userId);
  }

  @Get(':id/following')
  @HttpCode(HttpStatus.OK)
  async getFollowing(@Param('id') userId: number): Promise<User[]> {
    return await this.usersService.getFollowing(userId);
  }

  @Post(':id/follow')
  @HttpCode(HttpStatus.CREATED)
  async follow(
    @Param('id') userId: number,
    @Body('followingId') followingId: number,
  ) {
    return await this.usersService.follow(userId, followingId);
  }

  @Delete(':id/unfollow')
  @HttpCode(HttpStatus.CREATED)
  async unfollow(
    @Param('id') userId: number,
    @Body('followingId') followingId: number,
  ) {
    return await this.usersService.unfollow(userId, followingId);
  }
}
