import { NotFoundException, Success } from '../../../../../../lib/utils';
import { MessageDto } from '../dto/message.dto';
import { MessageRepository } from '../repository/message.repository';

export class MessageService {
  constructor() {}

  async createMessage(
    messageDto: MessageDto
  ): Promise<Success | NotFoundException> {
    try {
      const result = await new MessageRepository().createMessage(messageDto);

      return new Success(result);
    } catch (error) {
      return new NotFoundException({
        data: 'Unable to create user',
      });
    }
  }

  async getMessages() {
    try {
      const result = await new MessageRepository().getMessages();

      return new Success(result);
    } catch (error) {
      return new NotFoundException({
        data: 'Unable to get user',
      });
    }
  }
}
