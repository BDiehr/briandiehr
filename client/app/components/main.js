import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute } from 'react-router';
require('../styles/bootstrap.css');
require('babel/polyfill');

const routes = (
  <Router>
    <Route path="/" component={require('./shared/layout/index')}>
      <IndexRoute component={require('./pages/home/index')} />
      <Route path="hacker-news-vs-reddit" component={require('./pages/hackerNewsVsReddit/index')} />
      <Route path="reddit-markov-chains" component={require('./pages/redditMarkovChains')} />
      <Route path="about" component={require('./pages/about/index')} />
      <Route path="code" component={require('./pages/code/index')} />
      <Route path="layout-editor" component={require('./pages/layoutEditor')} />
      <Route path="*" component={require('./pages/notfound/index')} />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.getElementById('app'));
