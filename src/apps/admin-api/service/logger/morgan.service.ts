import { MorganService } from '../../../../shared';
import winston from 'winston';
import { ENVIRONMENTS_VARIABLE, ENVIRONMENTS } from '../../../../lib/enums';
import { getEnvironmentData } from '../../../../lib/utils';
import { MORGAN_LOG_TYPE } from '../../../../lib/constants';

class AdminMorganService extends MorganService {
  constructor(
    public readonly logger: winston.Logger,
    public readonly morganLogType: string
  ) {
    super(
      logger,
      morganLogType,
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
        ENVIRONMENTS.PROD ||
        getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
          ENVIRONMENTS.STG
    );
  }
}

export function adminMorganMiddleware(logger: winston.Logger) {
  return new AdminMorganService(logger, MORGAN_LOG_TYPE).morganMiddleware();
}
