import { ServerTypeAndStage } from '../../models/server-type/server-type.model';

export function getRuntimeServerTypeAndStage(
  processArgv: Array<string>
): ServerTypeAndStage {
  const serverType = processArgv[2],
    deployType = processArgv[3];

  const serverTypeAndStage = new ServerTypeAndStage(serverType, deployType);

  return serverTypeAndStage;
}
