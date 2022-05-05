import cron from 'node-cron';
import { RabbitMqService } from '../../../../service/rabbitmq/rabbitmq.service';
import { UserRepository } from '../../user/repository/user.repository';
import { WhatsappNotifyRepository } from '../repository/whatsapp-notify.repository';
import { WhatsappNotifyService } from '../services/whatsapp-notify.service';

export class WhatsappNotifyProvider {
  rabbitMqService!: RabbitMqService;

  constructor() {
    this._start();
  }

  async _start() {
    /**
     * Run at least 1 in day
     */
    this.rabbitMqService = await new RabbitMqService().init();

    new WhatsappNotifyService(this.rabbitMqService);

    this.runOneTimeInADay();
    this.runEveryInterval();
  }

  async runOneTimeInADay() {
    const scheduledList =
      await new WhatsappNotifyRepository().getScheduledList();

    const oneTime = scheduledList.filter(
      (accu) => accu.cycleType === 'ONE_TIME'
    );

    cron.schedule('* * * * * *', async () => {
      const date = new Date();

      const extractForParticularTime = oneTime.filter((accu) => {
        if (accu.time.hour === date.getSeconds()) {
          return true;
        }
      });

      extractForParticularTime.forEach(async (accu) => {
        const pub: any = await this.rabbitMqService.getPublisherChannel();

        this.sendToUserByPub(pub, accu);
        // pub(Buffer.from(JSON.stringify(accu)));
      });
    });
  }
  async runEveryInterval() {
    const scheduledList =
      await new WhatsappNotifyRepository().getScheduledList();

    const interValRange = scheduledList.filter(
      (accu) => accu.cycleType === 'INTERVAL'
    );

    interValRange.forEach((accu) => {
      cron.schedule(`*/${accu.intervalRange} * * * *`, async () => {
        const pub: any = await this.rabbitMqService.getPublisherChannel();

        this.sendToUserByPub(pub, accu);
        // pub();
      });
    });
  }

  async sendToUserByPub(pub: any, messageObject: any) {
    const usersList = await new UserRepository().getUsers();

    if (!usersList.length) {
      return;
    }
    usersList.forEach((user: any) => {
      const object = {
        messageObject,
        user,
      };

      pub(Buffer.from(JSON.stringify(object)));
    });
  }
}
