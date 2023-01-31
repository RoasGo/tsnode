import { to } from '../helpers/fetch.helper';
import Logger from '../lib/logger';
import Config from '../utils/config';
import PostgreSQL from './postgresql';

const config = Config.get();
const logger = Logger.getLogger('database');

export const initDatabases = () => {
   logger.info('Connecting databases... ');

   Object.keys(config.service.databases).forEach((database) => {
      const dialect = config.service.databases[database].dialect;
      switch (dialect) {
         case 'postgresql':
            logger.info(`[${dialect}] init connection to <${database}>`);
            to(PostgreSQL.getConnectionClient(database));
            break;
         default:
            break;
      }
   });
};
