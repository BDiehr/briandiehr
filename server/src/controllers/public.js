import redditMarkovChain from '../tasks/redditMarkovChain';

function * status() {
  const ctx = this;
  ctx.status = 200;
}

function * getSubredditInfo() {
  const ctx = this;
  const subreddit = ctx.params.subreddit;
  if (subreddit === undefined) {
    ctx.throw(400, 'subreddit must be specified');
  }

  const results = yield redditMarkovChain(subreddit).call();
  ctx.status = 200;
  ctx.body = results;
}

export {
  status,
  getSubredditInfo,
};
