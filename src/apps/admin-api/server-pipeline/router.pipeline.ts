import { Application } from 'express';
import { GRAPHQL_ROUTE } from '../../../lib/constants';
import { ENVIRONMENTS_VARIABLE } from '../../../lib/enums';
import { getEnvironmentData } from '../../../lib/utils';
import { V1Routes } from '../api';

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

    this.app.use(
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'API_PATH'),
      await new V1Routes().routes
    );
  }

  async setGraphqlRoutesForApplication(): Promise<void> {
    this.app.use(GRAPHQL_ROUTE, await GraphqlAppService.getGraphQlHttp());
  }
}
