import amqp from 'amqplib';
import { ENVIRONMENTS_VARIABLE } from '../../../../lib/enums';
import { getEnvironmentData } from '../../../../lib/utils';
export class RabbitMqService {
  public amqp!: amqp.Connection;
  public ch!: any;
  public queueName: string = 'TASK';
  constructor() {}

  async init() {
    this.amqp = await amqp.connect(
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'AMQP_CONNECTION_URL')
    );
    this.ch = await this.amqp.createChannel();

    return this;
  }

  async getPublisherChannel() {
    return new Promise(async (resolve, reject) => {
      const ch = this.ch;

      await ch.assertQueue(this.queueName);

      resolve(async (message: any) => {
        await ch.sendToQueue(this.queueName, message);
      });
    });
  }

  async getConsumerChannel() {
    return new Promise(async (resolve, reject) => {
      const ch = this.ch;

      await ch.assertQueue(this.queueName);

      resolve(ch);
    });
  }
}
