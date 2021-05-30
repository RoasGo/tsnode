import Config from '../utils/config';
import initMongoDB from './mongodb';

const config = Config.get();

export const initDatabases = () => {
  console.log('info', 'Connecting databases... ');

  Object.keys(config.service.databases).forEach((database) => {
    const dialect = config.service.databases[database].dialect;
    switch (dialect) {
      case 'mongodb':
        console.log('info', `[${dialect}] init connection to <${database}>`);
        initMongoDB(database);
        break;
      default:
        break;
    }
  });

  console.log('info', 'Databases connected');
};
