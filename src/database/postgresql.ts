import Config from '../utils/config';
import Logger from '../lib/logger';
import { Pool } from 'pg';

const config = Config.get();
const logger = Logger.getLogger('database');

export default class PostgreSQL {
  database;
  connectionPool;

  static instance;

  constructor(database) {
    const { dbName, user, password, host, port } = config.service.databases[database];
    this.database = database;
    this.connectionPool = new Pool({
      user: user,
      host: host,
      database: dbName,
      password: password,
      port: port,
    });
  }

  async initPostgreSQL() {
    const client = await this.connectionPool.connect();
    try {
      await client.query('SELECT NOW()');
      logger.info(`Connection to <${this.database}> has been established successfully.`);
    } catch (err) {
      logger.info(`Unable to connect to the database:: <${this.database}> :: ${err}`);
    } finally {
      client?.release();
    }
  }

  static async getConnectionClient(database = 'main') {
    try {
      if (!PostgreSQL.instance) {
        PostgreSQL.instance = new PostgreSQL(database);

        await PostgreSQL.instance.initPostgreSQL();
      }

      return PostgreSQL.instance.connectionPool.connect();
    } catch (err) {
      logger.info(`Unable to connect to the database:: <${database}> :: ${err}`);
      return Promise.reject(err);
    }
  }
}
