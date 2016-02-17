const fs = require('fs');
const path = require('path');
const _ = require('lodash');
const htmlescape = require('htmlescape');
const App = require('../src/app').default;

module.exports = function(app) {
  const config = app.config;
  const template = path.join(__dirname, './views/layout.tmpl');
  const layout = _.template(fs.readFileSync(template, 'utf8'));

  app.renderReact = App.renderReact;

  app.jsonError = function *(next) {
    try {
      yield next;
    } catch(err) {
      this.status = err.status || 500;

      let body;

      if (err.response) {
        body = err.response;
      } else if (err.stack && this.env !== 'production') {
        body = {error: err.stack};
      } else {
        body = {error: err.message ? err.message : String(err)};
      }
      this.body = body;
    }
  };

  app.renderLayout = function *() {
    let bootstrap = {
      path: this.path
    };

    let layoutData = _.defaults({
      stylesheet: '/css/base.css',
      javascript: '/bundle.js',
      rootHTML: this.state.html,
      appStart: `App.default.start(${htmlescape(bootstrap)});`
    }, config.layout.pageConstants);

    this.body = layout(layoutData);
  };
};
