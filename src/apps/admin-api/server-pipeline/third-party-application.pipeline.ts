import { Application } from 'express';
import mongoose from 'mongoose';
import {
  MONGODB_FAST_QUERY_CONNECTION,
  MONGODB_SLOW_QUERY_CONNECTION,
} from '../../../lib/constants/database.constant';
import { ENVIRONMENTS_VARIABLE } from '../../../lib/enums';
import { getEnvironmentData } from '../../../lib/utils';
import { CronBootstrap } from '../api/v1/cron';
import { MONGODB_CONFIG } from '../config';
import { MongodbService } from '../service/database/mongodb.service';

import { Logger } from '../service/logger/logger.service';
import { adminMorganMiddleware } from '../service/logger/morgan.service';

export class ThirdPartyDependentApplication {
  constructor(public readonly app: Application) {
    this.fastQueriesToDatabaseMongodbConnection();
    this.slowQueriesToDatabaseMongodbConnection();
    this.startCronJob();

    /**Init Logger */

    this.initLoggerService();
  }

  async fastQueriesToDatabaseMongodbConnection() {
    /**Connect to mongodb Database */

    try {
      const fastQueryMongoDBConnection = await mongoose.connect(
        getEnvironmentData(
          ENVIRONMENTS_VARIABLE.ADMIN,
          'MONGO_DB_CONNECTION_URL'
        ),
        MONGODB_CONFIG
      );

      MongodbService.container.set(
        MONGODB_FAST_QUERY_CONNECTION,
        fastQueryMongoDBConnection
      );

      /**
       * Logging Here
       */
      Logger.logger().info('MongoDB Fast Conn.');
    } catch (error) {
      Logger.logger().error('Error in MongoDB Fast Conn.');
    }
  }
  async slowQueriesToDatabaseMongodbConnection() {
    /**Connect to mongodb Database */

    try {
      const slowQueryMongoDBConnection = await mongoose.connect(
        getEnvironmentData(
          ENVIRONMENTS_VARIABLE.ADMIN,
          'MONGO_DB_CONNECTION_URL'
        ),
        MONGODB_CONFIG
      );

      MongodbService.container.set(
        MONGODB_SLOW_QUERY_CONNECTION,
        slowQueryMongoDBConnection
      );

      /**
       * Logging Here
       */
      Logger.logger().info('MongoDB Slow Conn.');
    } catch (error) {
      Logger.logger().error('Error in MongoDB Slow Conn.');
    }
  }

  async initLoggerService() {
    Logger.transportsAdding();
    Logger.constructLogger();

    /**Init Morgan logger for http with winston */

    this.app.use(adminMorganMiddleware(Logger.getLogger()));
  }

  async startCronJob() {
    new CronBootstrap();
  }
}
