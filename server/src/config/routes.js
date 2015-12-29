const Router = require('koa-router');
const publicController = require('../controllers/public');

function routeConfig(app) {
  const publicRouter = new Router();
  publicRouter.get('/status', publicController.status);
  publicRouter.get('/reddit_markov_chain/:subreddit', publicController.getSubredditInfo);
  app.use(publicRouter.routes());
}

export default routeConfig;
