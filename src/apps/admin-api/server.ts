import { ENVIRONMENTS_VARIABLE } from '../../lib/enums';
import { BootstrapServerInterface } from '../../lib/interface/bootstrap-server/bootstrap.server.interface';
import { ServerTypeAndStage } from '../../lib/models/server-type/server-type.model';

import { PrintLogs } from '../../shared';
import { ExpressApp } from '../../shared/express/express.service';
import { DedicatedMiddlewareService } from './server-pipeline/dedicated.middleware.pipeline';
import { RouterPipeline } from './server-pipeline/router.pipeline';

import { ThirdPartyDependentApplication } from './server-pipeline/third-party-application.pipeline';

export class AdminServerApi
  extends ExpressApp
  implements BootstrapServerInterface
{
  constructor(public readonly serverTypeAndStage: ServerTypeAndStage) {
    super();

    this.initThirdPartyDependentApplication();
    this.initDedicatedMiddleware();
    this.initRouters();
  }

  initDedicatedMiddleware(): void {
    new DedicatedMiddlewareService(this.app);
  }
  initThirdPartyDependentApplication(): void {
    new ThirdPartyDependentApplication(this.app);
  }
  initCustomRuntimeApplication(): void {
    throw new Error('Method not implemented.');
  }

  async initRouters(): Promise<void> {
    new RouterPipeline(this.app);
  }

  listen(port: number, host: string, callback?: Function): void {
    const printServerStart = new PrintLogs();

    printServerStart.setServerStartedAt();
    printServerStart.setBaseUrlOfServer(ENVIRONMENTS_VARIABLE.ADMIN);
    printServerStart.setServerDeploymentTypeAndServerType(
      this.serverTypeAndStage.deployType,
      this.serverTypeAndStage.serverType
    );

    this.getServer.listen(port, () => printServerStart.print());
  }
}
