import express, { Application } from 'express';
import {
  CertificateSslOrTlsInterface,
  ExpressApplication,
} from './interface/express.interface';
import { readFileSync } from 'fs-extra';
import { createServer, ServerOptions } from 'spdy';
import { SslAndTlsConfig } from '../../config';
import { PRIVATE_KEY, CERTIFICATE, CA_BUNDLE } from '../../lib/constants';
import { ENVIRONMENTS_VARIABLE, ProtocolType } from '../../lib/enums';
import { getEnvironmentData } from '../../lib/utils';

export abstract class ExpressApp implements ExpressApplication {
  public readonly app: Application = express();

  private certificate!: Object;

  constructor() {
    if (
      getEnvironmentData(ENVIRONMENTS_VARIABLE.ADMIN, 'SSL_TLS_TYPE') ===
      ProtocolType.HTTPS
    ) {
      this.tlsSslSetupProcess(PRIVATE_KEY, CERTIFICATE, CA_BUNDLE);
    }
  }

  tlsSslSetupProcess(key: string, cert: string, ca: string): void {
    this.certificate = {
      key: readFileSync(SslAndTlsConfig.getKey(key)),
      cert: readFileSync(SslAndTlsConfig.getCert(cert)),
    };
  }

  get getServer() {
    if (this.certificate) {
      return createServer(this.certificate as ServerOptions, this.app);
    }
    return createServer(this.app);
  }
}
