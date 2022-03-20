import { ServerTypeInterface } from '../../interface/server-type/server-type.interface';

export class ServerTypeAndStage implements ServerTypeInterface {
  constructor(public serverType: string, public deployType: string) {}
}
