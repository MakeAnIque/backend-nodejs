import { Request, Response, NextFunction } from 'express';
import {
  ConstructResponse,
  Exception,
} from '../../../../../../lib/utils/response/response.util';
import { MessageService } from '../services/message.service';

export class MessageController {
  constructor(
    public readonly req: Request,
    public readonly res: Response,
    public readonly next: NextFunction
  ) {}

  async createMessage() {
    // console.log((this.req as any).instanceBody);

    try {
      const result = await new MessageService().createMessage(
        (this.req as any).instanceBody
      );

      new ConstructResponse(this.res, result);
    } catch (error) {
      new ConstructResponse(
        this.res,
        new Exception({ error: 'Internal Error' })
      );
    }
  }

  async getMessage() {
    try {
      const result = await new MessageService().getMessages();

      new ConstructResponse(this.res, result);
    } catch (error) {
      new ConstructResponse(
        this.res,
        new Exception({ error: 'Internal Error' })
      );
    }
  }
}
