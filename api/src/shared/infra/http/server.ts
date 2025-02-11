import consola from 'consola';
import '@shared/container';

import app from './app';
import { envConfig } from '@config/envConfig';
import http from 'http';

const server = http.createServer(app);

const port = envConfig.appPort;
server.listen(port, () => {
  consola.info(`Back-end started on localhost:${port}! 🚀`);
});
