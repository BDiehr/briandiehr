import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
require('../styles/bootstrap.css');
require('babel/polyfill');

const routes = (
  <Router>
    <Route path="/" component={require('./shared/layout')}>
      <IndexRoute component={require('./pages/home')} />
      <Route path="hacker-news-vs-reddit" component={require('./pages/hackerNewsVsReddit')} />
      <Route path="about" component={require('./pages/about')} />
      <Route path="contribute" component={require('./pages/contribute')} />
      <Route path="*" component={require('./pages/notfound')} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
