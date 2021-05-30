import app from './App';
import Config from './utils/config';
import * as artifactInfo from '../package.json';

const config = Config.get();

(async () => {
    const host = '0.0.0.0';
    const port = config.service.port;

    app.listen(port, host, () => {
        console.log('info', `<${artifactInfo.name}> is listening on ${host}:${port}`)
    });

})();