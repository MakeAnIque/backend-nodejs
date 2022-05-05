import twilio from 'twilio';
import { ENVIRONMENTS_VARIABLE } from '../../../../lib/enums';
import { getEnvironmentData } from '../../../../lib/utils';

export class WhatsappService {
  public twilio = twilio(
    getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'WHATS_APP_ACCOUNT_SID'),
    getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'WHATS_APP_AUTH_TOKEN')
  );
  constructor() {}

  template(message: any, user: any) {
    return `Hi *${user.firstName} ${user.lastName},*\n${message.message}`;
  }

  async sendMessage(template: string, cred: any) {
    try {
      await this.twilio.messages.create({
        from: `whatsapp:${getEnvironmentData(
          ENVIRONMENTS_VARIABLE.ADMIN,
          'WHATS_APP_MAIN_NUMBER'
        )}`,
        body: template,
        to: `whatsapp:${cred.countryCode}${cred.mobileNumber}`,
      });

      return true;
    } catch (error) {
      throw error;
    }
  }
}
