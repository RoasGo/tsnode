import * as mongoose from 'mongoose';
import * as mongooseSequence from 'mongoose-sequence';

import Config from '../utils/config';

export const AutoIncrement = mongooseSequence(mongoose);

const config = Config.get();

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const databaseEvents = (dbConnectionName: string) => {
  mongoose.connection.on('error', (error: any) => {
    console.error('error', `<${dbConnectionName}> connection error: ${error}`);
  });
  mongoose.connection.on('disconnected', () => {
    console.error('error', `<${dbConnectionName}> connection lost`);
  });
  mongoose.connection.on('error', () => {
    console.error('info', `Connecting to <${dbConnectionName}>`);
  });
  mongoose.connection.on('error', () => {
    console.error('info', `<${dbConnectionName}> connected`);
  });
};

export default async (dbConnectionName: string) => {
  try {
    databaseEvents(dbConnectionName);

    await mongoose.connect(config.service.databases[dbConnectionName].host, {
      user: config.service.databases[dbConnectionName].user,
      pass: config.service.databases[dbConnectionName].password,
      dbName: config.service.databases[dbConnectionName].dbName,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  } catch (err: any) {
    console.error('error', `Could not connect to <${dbConnectionName}>: ${err}.`);
    process.exit(1);
  }
};
