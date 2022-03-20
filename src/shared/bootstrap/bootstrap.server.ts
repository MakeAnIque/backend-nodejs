import { AdminServerApi } from '../../apps/admin-api/server';
import { ServerTypeAndStage } from '../../lib/models/server-type/server-type.model';
import { getRuntimeServerTypeAndStage } from '../../lib/utils/server-type/server.type.util';
import { EnvironmentService } from '../environments/environments.service';
import { BootstrapServerInterface } from './interface/bootstrap.server.interface';

export abstract class BootstrapServer implements BootstrapServerInterface {
  serverTypeAndStage!: ServerTypeAndStage;
  constructor() {
    this.serverTypeAndStage = getRuntimeServerTypeAndStage(process.argv);

    this.init();
  }

  init(): void {
    /**Init Environments */
    new EnvironmentService(this.serverTypeAndStage).setEnvironment();
  }
}
