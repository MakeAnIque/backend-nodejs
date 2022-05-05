import { Router } from 'express';
import { MessageRoutes } from '../message';
import { UserRoutes } from '../user';

export class V1Routes {
  private readonly VERSION_ROUTE: string = '/v1';

  router: Router = Router();
  constructor() {
    this._initRoutes();
  }

  private async _initRoutes(): Promise<void> {
    /**
     *  Users REST API
     */
    this.router.use(this.VERSION_ROUTE, await new UserRoutes().routes);
    this.router.use(this.VERSION_ROUTE, await new MessageRoutes().routes);
  }

  get routes() {
    return this.router;
  }
}
