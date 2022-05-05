import { WhatsappNotifyProvider } from '../provider/whatapp-notify.provider';

export class CronBootstrap {
  constructor() {
    this._init();
  }

  async _init() {
    new WhatsappNotifyProvider();
  }
}
