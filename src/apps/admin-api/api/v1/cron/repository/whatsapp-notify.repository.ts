import { INTERVAL_MESSAGE_TYPE } from '../../../../../../lib/constants/interval-message.constant';

export class WhatsappNotifyRepository {
  constructor() {}

  async getScheduledList() {
    /**
     * This will came from db
     */
    return INTERVAL_MESSAGE_TYPE;
  }
}
