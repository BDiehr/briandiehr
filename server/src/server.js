import debug from 'debug';
import errorHandler from './middleware/errorHandler';
import addStatus from './middleware/addStatus';
import config, { settings } from './config';
import staticCache from 'koa-static-cache';
import path from 'path';
import redis from 'redis';

if (settings.app.env === 'development') {
  debug.enable('dev');
}

const app = require('koa')();
app.use(require('koa-logger')());
app.use(require('koa-body-parser')());
app.use(require('koa-cors')({ headers: [
  'Content-Type',
  'Access-Control-Request-Origin',
]}));

/** Enable rate limiting */
app.use(require('koa-ratelimit')({
  db: redis.createClient(),
  duration: 60000,
  max: 40,
  id: (context) => context.ip,
}));

/** Use static cache if available for request */
app.use(staticCache(path.join(__dirname, 'static'), { dynamic: true }));

/** Custom middleware helpers */
app.use(errorHandler());
app.use(addStatus());

/** Configure application */
config.dataStorage(app);
config.cronJobs(app);
config.routes(app);

debug('dev')(`environment: ${settings.app.env}`);
debug('dev')(`listening on port ${settings.app.port}`);
app.listen(settings.app.port);
