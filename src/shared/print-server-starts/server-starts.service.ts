import chalk from 'chalk';
import { ENVIRONMENTS_VARIABLE, ProtocolType } from '../../lib/enums';
import { PrintLogsModel } from '../../lib/models/print-logs/print-logs.model';
import { getEnvironmentData } from '../../lib/utils';
import { configStatusWithColors } from './interface/print.config.interface';

export class PrintLogs {
  private readonly logPrintableData = new Array<
    string | Date | number | Object
  >();

  constructor() {}

  public setServerStartedAt() {
    this.log(
      new PrintLogsModel(`SERVER STARTED AT: ${new Date().toUTCString()}`, [
        chalk.gray as Function,
        chalk.underline,
      ])
    );
  }

  public setBaseUrlOfServer(environmentType: string) {
    this.log(
      new PrintLogsModel(
        `\nHOSTED URL: ${
          getEnvironmentData(environmentType, 'SSL_TLS_TYPE') ===
          ProtocolType.HTTPS
            ? 'https'
            : 'http'
        }://localhost:${getEnvironmentData(environmentType, 'NODE_PORT')}`,
        [chalk.blue as Function, chalk.underline]
      )
    );
  }

  public setServerDeploymentTypeAndServerType(
    environmentType: string,
    serverType: string
  ) {
    this.log(
      new PrintLogsModel(
        `\nDEPLOYMENT TYPE: ${environmentType}, SERVER TYPE: ${serverType}`,
        [chalk.red as Function, chalk.underline]
      )
    );
  }

  public log(config: PrintLogsModel) {
    this.logPrintableData.push(this.iterateConfigFunctionCalls(config));
  }

  private iterateConfigFunctionCalls({ message, configs }: PrintLogsModel) {
    let modifiedMessage = message;
    configs.forEach((config) => {
      modifiedMessage = config(modifiedMessage);
    });

    return modifiedMessage;
  }

  public getLog() {
    return this.logPrintableData.join('');
  }

  public print() {
    console.log(...this.logPrintableData);
  }
}
