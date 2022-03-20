import { Application } from 'express';
import { GRAPHQL_ROUTE } from '../../../lib/constants';

import { GraphqlAppService } from '../service';

export class RouterPipeline {
  constructor(public readonly app: Application) {
    this.setExpressRoutesOfApplication();
    this.setGraphqlRoutesForApplication();
  }

  async setExpressRoutesOfApplication(): Promise<void> {
    /**
     * Router pipeline for Express Routing
     */
  }

  async setGraphqlRoutesForApplication(): Promise<void> {
    this.app.use(GRAPHQL_ROUTE, await GraphqlAppService.getGraphQlHttp());
  }
}
