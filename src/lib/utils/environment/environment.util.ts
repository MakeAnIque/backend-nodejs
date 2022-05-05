import { ENV_SEP } from '../../constants';

export function getEnvironmentData(prefix: string, key: string): string {
  if (!prefix && !key) {
    throw new Error(
      'Please Provide {{ PREFIX }} & {{ key }} to get environment data.'
    );
  }

  const environmentVariable = `${prefix}${ENV_SEP}${key}`;

  return process.env[environmentVariable] || '';
}
