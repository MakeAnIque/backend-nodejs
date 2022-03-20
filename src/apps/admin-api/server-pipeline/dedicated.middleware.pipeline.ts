import { Application } from 'express';
import cors from 'cors';

export class DedicatedMiddlewareService {
  constructor(public readonly app: Application) {
    // console.log('middleware');

    this.applyCors();
    // -
    // -
    // -
    /**
     * Apply logger
     */

    this.applyLogger();
  }

  /**
   * Apply cors with allowed urls and domain names
   */
  applyCors() {
    this.app.use(cors());
  }

  applyLogger() {}
}
