import { Application } from 'express';

export interface CertificateSslOrTlsInterface {
  key: string | BufferEncoding;
  cert: string | BufferEncoding;
  ca: string | BufferEncoding;
}

export interface ExpressApplication {
  app: Application;
  tlsSslSetupProcess(key: string, cert: string, ca: string): void;
}
