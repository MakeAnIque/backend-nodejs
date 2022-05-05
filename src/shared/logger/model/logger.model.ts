import { Logger } from 'winston';
import { WinstonLoggerConfigInterface } from '../interface/winston.interface';

export class LoggerConfig implements WinstonLoggerConfigInterface {
  constructor(
    public readonly filename: string,
    public readonly label: string
  ) {}
}
