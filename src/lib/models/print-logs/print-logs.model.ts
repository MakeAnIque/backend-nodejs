import { configStatusWithColors } from '../../../shared/print-server-starts/interface/print.config.interface';

export class PrintLogsModel implements configStatusWithColors {
  constructor(
    public readonly message: string | Date | number | Object,
    public readonly configs: Array<Function>
  ) {}
}
