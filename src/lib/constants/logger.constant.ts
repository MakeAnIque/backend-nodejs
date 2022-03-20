import { join } from 'path';

export const LOGGER_LEVELS = {
  ERROR: 'error',
  WARN: 'warn',
  INFO: 'info',
  HTTP: 'http',
  VERBOSE: 'verbose',
  DEBUG: 'debug',
  SILLY: 'silly',
};

export const MORGAN_LOG_TYPE = 'combined';

export const LOGGER_LOG_FILE_PATH = {
  ADMIN_HTTP_LOG_PATH: join('src', 'logs', 'admin-http-%DATE%.log'),
  ADMIN_INFO_LOG_PATH: join('src', 'logs', 'admin-info-%DATE%.log'),
  ADMIN_ERROR_LOG_PATH: join('src', 'logs', 'admin-error-%DATE%.log'),
};
