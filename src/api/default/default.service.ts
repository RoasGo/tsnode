import PostgreSQL from '../../database/postgresql';
import Logger from '../../lib/logger';

const logger = Logger.getLogger('default-service');

export async function execute(query: string) {
  const client = await PostgreSQL.getConnectionClient();
  try {
    const result = await client.query(query);

    return result.rows;
  } catch (err) {
    logger.info('An error occurred while fetching', err);

    throw new Error(err);
  } finally {
    client.release();
  }
}
