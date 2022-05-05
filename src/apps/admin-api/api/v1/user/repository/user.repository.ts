import { MONGODB_FAST_QUERY_CONNECTION } from '../../../../../../lib/constants/database.constant';
import { UserModel } from '../../../../../../lib/schemas';
import { MongodbService } from '../../../../service/database/mongodb.service';
import { UserDto } from '../dto/user.dto';

export class SequelizeRepository {
  constructor() {
    /** Database Agnostic */
  }
}

export class MongoDBRepository {
  constructor() {}

  async save(userData: UserDto) {
    const userModel: any = UserModel(
      MongodbService.container.get(MONGODB_FAST_QUERY_CONNECTION)
    );

    return new userModel(userData).save();
  }

  async find() {
    const userModel: any = UserModel(
      MongodbService.container.get(MONGODB_FAST_QUERY_CONNECTION)
    );

    return userModel.find();
  }
}

export class UserRepository {
  constructor() {}

  async createUser(userData: UserDto) {
    return await new MongoDBRepository().save(userData);
  }

  async getUsers() {
    return await new MongoDBRepository().find();
  }
}
