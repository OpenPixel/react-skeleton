
const Router  = require('koa-router');
const parse   = require('co-body');

module.exports = function(app) {
  let router = new Router();

  router
    .get('/:path*', app.renderReact, app.renderLayout);

  app
    .use(router.routes())
    .use(router.allowedMethods());
};
