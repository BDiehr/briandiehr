function addStatusClosure() {
  return function * addStatus(next) {
    const ctx = this;
    yield next;
    if (ctx.body) {
      ctx.body.status = ctx.status;
    }
  };
}

export default addStatusClosure;
