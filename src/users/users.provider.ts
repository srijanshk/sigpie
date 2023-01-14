import { Followers } from './entities/followers.entity';
import { User } from './entities/user.entity';

export const usersProviders = [{ provide: 'User', useValue: User }];
export const followersProviders = [{ provide: 'Followers', useValue: Followers}]
