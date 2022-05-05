import { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

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

    this.applyBodyParser();
  }

  /**
   * Apply cors with allowed urls and domain names
   */
  applyCors() {
    this.app.use(cors());
  }

  applyBodyParser() {
    // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.urlencoded({ extended: false }));

    // parse application/json
    this.app.use(bodyParser.json());
  }

  applyLogger() {}
}
