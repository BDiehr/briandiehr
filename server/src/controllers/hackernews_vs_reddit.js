
function * getTopPosts() {
  const ctx = this;
  const knex = ctx.app.knex;
  const topPosts = yield knex('topPosts').select('*');

  ctx.status = 200;
  ctx.body = { topPosts };
}

export {
  getTopPosts,
};
