import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import * as express from 'express';
import * as helmet from 'helmet';
import { initDatabases } from './database';

import Config from './utils/config';
import { IDefault } from './utils/config-interfaces';

class App {
  public express: express.Application;
  private config: IDefault;

  constructor() {
    this.express = express();
    this.config = Config.get();

    this.initDatabase();
    this.setMiddlewares();
    this.setRoutes();
  }

  private initDatabase(): void {
    initDatabases();
  }

  private setMiddlewares(): void {
    // Cross-origin
    this.express.use((req: express.Request, res: express.Response, next) => {
      res.header('Access-Control-Allow-Origin', req.headers.origin);
      res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, Authorization'
      );
      next();
    });
    this.express.use(cors({ credentials: true, origin: false }));
    this.express.use(bodyParser.json({ limit: '50mb' }));
    this.express.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
    this.express.use(helmet());
  }

  private setRoutes(): void {
    // Set your routes
    console.log('Acá van las rutas');
  }
}

const app = new App();

export default app.express;
