import { WhatsappService } from '../../../../service';
import { RabbitMqService } from '../../../../service/rabbitmq/rabbitmq.service';

export class WhatsappNotifyService {
  constructor(public readonly rabbitMqService: RabbitMqService) {
    this.init();
  }

  async init() {
    const sub: any = await this.rabbitMqService.getConsumerChannel();

    sub.consume(this.rabbitMqService.queueName, (data: any) => {
      this.messageCallback(sub, data);
    });
  }

  async messageCallback(sub: any, data: any) {
    const wts = new WhatsappService();
    if (!data.content) {
      sub.ack(data);
      return;
    }

    try {
      const { messageObject, user } = JSON.parse(data.content.toString());

      const template = wts.template(messageObject, user);

      await wts.sendMessage(template, user);

      sub.ack(data);
    } catch (error) {
      console.log(error);
      sub.ack(data);
    }
  }
}
