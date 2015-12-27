const Router = require('koa-router');
const hackerNewsVsRedditController = require('../controllers/hackernews_vs_reddit');

function routeConfig(app) {
  /** Routers */
  const hackerNewsVsReddit = new Router();

  /** Public routes */
  hackerNewsVsReddit.get('/hackernews_vs_reddit/post', hackerNewsVsRedditController.getTopPosts);
  app.use(hackerNewsVsReddit.routes());
}

export default routeConfig;
