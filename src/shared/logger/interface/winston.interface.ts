import winston from 'winston';

export interface LoggerInterface {
  addLog(logLevel: string, logMessage: string): void;
  addTransports(transport: winston.transport): void;
}

export interface WinstonLoggerConfigInterface {
  filename: string;
  label: string;
}
