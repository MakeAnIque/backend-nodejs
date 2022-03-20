import { ServerTypeAndStage } from '../../../lib/models/server-type/server-type.model';

export interface BootstrapServerInterface {
  serverTypeAndStage: ServerTypeAndStage;

  init(): void;
}
