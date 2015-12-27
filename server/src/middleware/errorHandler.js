import debug from 'debug';

/**
 * Error Handler Middleware
 *
 * Before:
 * ctx
 *
 * After:
 * ctx
 *
 * @returns {Function}
 */
function errorHandlerClosure() {
  return function * errorHandler(next) {
    const ctx = this;
    try {
      yield next;
    } catch (err) {
      debug('dev')({err: err, errmsg: err.message, stack: err.stack});
      ctx.status = err.status && typeof err.status === 'number' && err.status || 400;
      ctx.body = {
        status: ctx.status,
        errmsg: JSON.stringify(err.message),
        clientResponse: err.clientResponse || 'Invalid request.',
      };
    }
  };
}

export default errorHandlerClosure;
