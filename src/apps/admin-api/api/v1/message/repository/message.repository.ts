import { MONGODB_FAST_QUERY_CONNECTION } from '../../../../../../lib/constants/database.constant';
import { MessageModel } from '../../../../../../lib/schemas';
import { MongodbService } from '../../../../service/database/mongodb.service';
import { MessageDto } from '../dto/message.dto';

export class SequelizeRepository {
  constructor() {
    /** Database Agnostic */
  }
}

export class MongoDBRepository {
  constructor() {}

  async save(messageDto: MessageDto) {
    const userModel: any = MessageModel(
      MongodbService.container.get(MONGODB_FAST_QUERY_CONNECTION)
    );

    return new userModel(messageDto).save();
  }

  async find() {
    const userModel: any = MessageModel(
      MongodbService.container.get(MONGODB_FAST_QUERY_CONNECTION)
    );

    return userModel.find();
  }
}

export class MessageRepository {
  constructor() {}

  async createMessage(messageDto: MessageDto) {
    return await new MongoDBRepository().save(messageDto);
  }

  async getMessages() {
    return await new MongoDBRepository().find();
  }
}
