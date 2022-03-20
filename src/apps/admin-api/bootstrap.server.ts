import 'reflect-metadata';
import { ENVIRONMENTS_VARIABLE } from '../../lib/enums';
import { getEnvironmentData } from '../../lib/utils';
import { BootstrapServer } from '../../shared';

import { AdminServerApi } from './server';

export class AdminApiBootstrapServer extends BootstrapServer {
  public initServerApplication(): void {
    new AdminServerApi(this.serverTypeAndStage).listen(
      +getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_PORT'),
      ''
    );
  }
}

new AdminApiBootstrapServer().initServerApplication();
