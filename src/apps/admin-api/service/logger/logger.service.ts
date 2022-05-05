import { LoggerConfig, LoggerService } from '../../../../shared';
import winston from 'winston';
import { LOGGER_LEVELS, LOGGER_LOG_FILE_PATH } from '../../../../lib/constants';
import DailyRotateFile from 'winston-daily-rotate-file';
import { getEnvironmentData } from '../../../../lib/utils';
import { ENVIRONMENTS, ENVIRONMENTS_VARIABLE } from '../../../../lib/enums';
import { format } from 'winston';
const { combine, splat, json, colorize } = format;

class AdminLoggerService extends LoggerService {
  public static transportsAdding() {
    if (
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
        ENVIRONMENTS.PROD ||
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
        ENVIRONMENTS.STG
    ) {
      AdminLoggerService.addTransports(
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: LOGGER_LOG_FILE_PATH.ADMIN_HTTP_LOG_PATH,
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '1d',
          level: LOGGER_LEVELS.HTTP,
          format: combine(splat(), json()),
        })
      );
      AdminLoggerService.addTransports(
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: LOGGER_LOG_FILE_PATH.ADMIN_INFO_LOG_PATH,
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '1d',
          level: LOGGER_LEVELS.INFO,
          format: combine(splat(), json()),
        })
      );

      AdminLoggerService.addTransports(
        new DailyRotateFile({
          datePattern: 'YYYY-MM-DD-HH',
          filename: LOGGER_LOG_FILE_PATH.ADMIN_ERROR_LOG_PATH,
          zippedArchive: true,
          maxSize: '20m',
          maxFiles: '1d',
          level: LOGGER_LEVELS.ERROR,
          format: combine(splat(), json()),
        })
      );
    } else {
      AdminLoggerService.addTransports(
        new winston.transports.Console({
          format: combine(splat(), json(), colorize()),
        })
      );

      // AdminLoggerService.addTransports(
      //   new winston.transports.Stream({
      //     stream: process.stderr,
      //     level: 'debug',
      //   })
      // );
    }
  }

  static logger() {
    if (
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
        ENVIRONMENTS.PROD ||
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'NODE_ENV') ===
        ENVIRONMENTS.STG
    ) {
      return AdminLoggerService.getLogger();
    } else {
      return console;
    }
  }
}

AdminLoggerService.setLogger(new LoggerConfig('admin.log', 'admin-log'));

export const Logger = AdminLoggerService;
