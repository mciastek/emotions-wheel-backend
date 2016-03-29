import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Redirect } from 'react-router';
import createBrowserHistory from 'history/lib/createBrowserHistory';

import Main from 'containers/Main';

import LoginView from 'views/LoginView';
import DashboardView from 'views/DashboardView';

const history = createBrowserHistory();

ReactDOM.render(
  <Router history={history}>
    <Route components={Main}>
      <Redirect from="/" to="login" />
      <Route path="login" components={LoginView}/>
      <Route path="dashboard" components={DashboardView}/>
    </Route>
  </Router>
, document.getElementById('app'));
