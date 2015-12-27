import debug from 'debug';
import errorHandler from './middleware/errorHandler';
import addStatus from './middleware/addStatus';
import config, { settings } from './config';

if (settings.app.env === 'development') {
  debug.enable('dev');
}

const app = require('koa')();
app.use(require('koa-logger')());
app.use(require('koa-body-parser')());
app.use(require('koa-cors')({ headers: [
  'Content-Type',
  'Authorization',
  'Access-Control-Request-Origin',
]}));

app.use(errorHandler());
app.use(addStatus());
config.dataStorage(app);
config.cronJobs(app);
config.routes(app);

debug('dev')(`enviroment: ${settings.app.env}`);
debug('dev')(`listening on port ${settings.app.port}`);
app.listen(settings.app.port);
