import { NextFunction, Request, Response, Router } from 'express';
import { UserController } from '../controllers/user.controller';
import { userMiddlewareFun } from '../validators/user.validator';

export class UserRoutes {
  router: Router = Router();

  constructor() {
    this._initRoutes();
  }

  private async _initRoutes(): Promise<void> {
    /**
     * Create Users
     */
    this.router.post(
      '/user',
      userMiddlewareFun,
      async (req: Request, res: Response, next: NextFunction) =>
        await new UserController(req, res, next).createUser()
    );

    /**
     * Get Users
     *
     */

    this.router.get(
      '/user',
      async (req: Request, res: Response, next: NextFunction) =>
        await new UserController(req, res, next).getUser()
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
