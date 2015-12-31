import debug from 'debug';
import errorHandler from './middleware/errorHandler';
import addStatus from './middleware/addStatus';
import config, { settings } from './config';
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


/** Response Caching */
const cache = require('lru-cache')({ maxAge: 1000 * 60 * 60 * 2 });
app.use(require('koa-cash')({
  get: function * get(key) {
    return cache.get(key);
  },
  set: function * set(key, value) {
    cache.set(key, value);
  },
}));

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
