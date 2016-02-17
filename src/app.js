import React from 'react';
import { render } from 'react-dom';
import { renderToString } from 'react-dom/server';
import { Router, match, RouterContext, browserHistory, createMemoryHistory } from 'react-router';
import { Root } from 'baobab-react/wrappers';
import tree from './state';
import routes from './routes';

const app = {
  start() {
    render(
      <Root tree={tree}>
        <Router history={browserHistory} routes={routes} />
      </Root>,
      document.getElementById('content')
    );
  },

  * renderReact(next) {
    match({ routes, location: this.path }, (error, redirectLocation, renderProps) => {
      if (error) {
        this.throw(error.message, 500);
      } else if (redirectLocation) {
        this.redirect(redirectLocation.pathname + redirectLocation.search);
      } else if (renderProps) {
        this.state.html = renderToString(
          <Root tree={tree}>
            <RouterContext {...renderProps} />
          </Root>
        );
      } else {
        this.throw(404);
      }
    });

    yield next;
  }
};

export default app;
