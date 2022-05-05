import { NotFoundException, Success } from '../../../../../../lib/utils';
import { UserDto } from '../dto/user.dto';
import { UserRepository } from '../repository/user.repository';

export class UserService {
  constructor() {}

  async createUser(userData: UserDto): Promise<Success | NotFoundException> {
    try {
      const result = await new UserRepository().createUser(userData);

      return new Success(result);
    } catch (error) {
      return new NotFoundException({
        data: 'Unable to create user',
      });
    }
  }

  async getUser() {
    try {
      const result = await new UserRepository().getUsers();

      return new Success(result);
    } catch (error) {
      return new NotFoundException({
        data: 'Unable to get user',
      });
    }
  }
}
