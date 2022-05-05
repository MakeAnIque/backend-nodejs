import { join } from 'path';
import app_root_path from 'app-root-path';

export class SslAndTlsConfig {
  static getKey(privateKey: string): string {
    return join(app_root_path.path, 'src', 'certs', privateKey);
  }

  static getCert(certificate: string): string {
    return join(app_root_path.path, 'src', 'certs', certificate);
  }

  static getCaBundle(caBundle: string): string {
    return join(app_root_path.path, 'src', 'certs', caBundle);
  }
}
