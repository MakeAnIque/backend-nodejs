import { ENVIRONMENTS, ENVIRONMENTS_VARIABLE } from '../../lib/enums';
import { ServerTypeAndStage } from '../../lib/models/server-type/server-type.model';
import { join } from 'path';
import app_root_path from 'app-root-path';
import {
  ADMIN_ENV,
  DEV_ENV,
  ENV_EXT,
  PROD_ENV,
  STG_ENV,
  WEBSITE_ENV,
} from '../../lib/constants';
import dotenv from 'dotenv';

export class EnvironmentService {
  constructor(public readonly serverTypeAndStage: ServerTypeAndStage) {}

  private getEnvironmentPath(): string {
    /**
     * Get Deploy Type
     */
    const { deployType, serverType } = this.serverTypeAndStage;

    switch (serverType) {
      case ENVIRONMENTS_VARIABLE.ADMIN:
        return this.checkDeployType(deployType, ADMIN_ENV);
      case ENVIRONMENTS_VARIABLE.WEBSITE:
        return this.checkDeployType(deployType, WEBSITE_ENV);
      default:
        throw new Error('Please Provide Server Type');
    }
  }

  private checkDeployType(deployType: string, filename: string) {
    switch (deployType) {
      case ENVIRONMENTS.PROD:
        return join(app_root_path.path, `${PROD_ENV}${filename}${ENV_EXT}`);
      case ENVIRONMENTS.STG:
        return join(app_root_path.path, `${STG_ENV}${filename}${ENV_EXT}`);
      case ENVIRONMENTS.DEV:
        return join(app_root_path.path, `${DEV_ENV}${filename}${ENV_EXT}`);
      default:
        return join(app_root_path.path, `${DEV_ENV}${filename}${ENV_EXT}`);
    }
  }

  public setEnvironment(): void {
    const environmentPath: string = this.getEnvironmentPath();

    dotenv.config({ path: environmentPath });
  }
}
