require('babel-register');
const koa = require('koa');
const path = require('path');
const co = require('co');
const serve = require('koa-static');
const Config = require(path.resolve('config'));

const app = koa();

app.init = co.wrap(function *(env) {
  if (env) { app.env = env; }

  app.config = new Config(app.env);

  app.use(serve(app.config.server.publicDir));

  if (app.env.environment !== 'production') {
    app.use(require('koa-logger')());
  }

  require(`${__dirname}/middleware`)(app);
  require(`${__dirname}/api`)(app);
  require(`${__dirname}/cms`)(app);
  app.server = app.listen(app.config.server.port);
});

module.exports = app;
