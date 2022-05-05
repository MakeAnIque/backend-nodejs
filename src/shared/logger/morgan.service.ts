import morgan, { StreamOptions } from 'morgan';
import winston from 'winston';

export abstract class MorganService {
  private stream(logger: winston.Logger, httpLogPrintable: boolean) {
    return {
      write: function (message: string) {
        return httpLogPrintable ? logger.http(message) : null;
      },
    } as StreamOptions;
  }

  private skip() {
    /**
     * Apply here the code of production and dev and staging
     */
    return false;
  }

  constructor(
    public readonly logger: winston.Logger,
    public readonly morganLogType: string,
    public readonly httpLogPrintable: boolean
  ) {}

  public morganMiddleware() {
    return morgan(this.morganLogType, {
      stream: this.stream(this.logger, this.httpLogPrintable),
      skip: () => false,
    });
  }
}
