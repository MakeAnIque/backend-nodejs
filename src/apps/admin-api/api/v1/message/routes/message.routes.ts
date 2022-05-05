import { NextFunction, Request, Response, Router } from 'express';
import { MessageController } from '../controllers/message.controller';
import { messageMiddlewareFun } from '../validators/message.validator';

export class MessageRoutes {
  router: Router = Router();

  constructor() {
    this._initRoutes();
  }

  private async _initRoutes(): Promise<void> {
    /**
     * Create Users
     */
    this.router.post(
      '/message',
      messageMiddlewareFun,
      async (req: Request, res: Response, next: NextFunction) =>
        await new MessageController(req, res, next).createMessage()
    );

    /**
     * Get Users
     *
     */

    this.router.get(
      '/message',
      async (req: Request, res: Response, next: NextFunction) =>
        await new MessageController(req, res, next).getMessage()
    );

    /**
     * TODO:
     * Update users and delete user will add in future
     */
  }

  get routes(): Router {
    return this.router;
  }
}
