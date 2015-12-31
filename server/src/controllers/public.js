import redditMarkovChain from '../tasks/redditMarkovChain';

function * status() {
  const ctx = this;
  ctx.status = 200;
}

function * getSubredditInfo() {
  const ctx = this;
  if (yield* ctx.cashed()) return;

  const subreddit = ctx.params.subreddit;
  if (subreddit === undefined) {
    ctx.throw(400, 'subreddit must be specified');
  }

  const results = yield redditMarkovChain(subreddit).call();
  ctx.status = 200;
  ctx.body = results;
}

function * getHackernewsVsRedditData() {
  const ctx = this;
  const knex = ctx.app.knex;
  if (yield* ctx.cashed()) return;
  const topPosts = yield knex('topPosts').select('*');
  ctx.status = 200;
  ctx.body = { topPosts };
}

export {
  status,
  getSubredditInfo,
  getHackernewsVsRedditData,
};
