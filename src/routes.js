import React from 'react';
import { Route, IndexRoute } from 'react-router';

import Site from './components/site';
import Home from './components/home';
import NoMatch from './components/nomatch';

const routes = (
  <Route path='/' component={Site}>
    <IndexRoute component={Home} />
    <Route path='*' component={NoMatch} />
  </Route>
);

export default routes;
