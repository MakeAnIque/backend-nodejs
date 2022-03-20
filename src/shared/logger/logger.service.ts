import winston, { createLogger, format, transports } from 'winston';
import { LoggerFileModel } from '../../lib/models/logger/logger-file.model';
import {
  LoggerInterface,
  WinstonLoggerConfigInterface,
} from './interface/winston.interface';

const { combine, timestamp, label, printf, prettyPrint } = format;

export abstract class LoggerService {
  private static _logger: winston.Logger;
  private static logConfig: WinstonLoggerConfigInterface;

  private static readonly transports: Array<winston.transport> = new Array();

  private static readonly loggerFormat = printf(
    ({ level, message, label, timestamp }) => {
      return `${timestamp} [${label}] ${level}: ${message}`;
    }
  );

  public static setLogger(logConfig: WinstonLoggerConfigInterface) {
    this.logConfig = logConfig;
  }

  public static constructLogger() {
    this._logger = winston.createLogger({
      format: combine(
        label({ label: this.logConfig.label }),
        timestamp(),
        prettyPrint(),
        this.loggerFormat
      ),
      transports: [...this.transports],
    });
  }

  public static addTransports(transport: winston.transport): void {
    this.transports.push(transport);
  }

  public static addLog(logLevel: string, logMessage: string): void {
    this._logger.log({
      level: logLevel,
      message: logMessage,
    });
  }

  public static getLogger() {
    return this._logger;
  }
}
