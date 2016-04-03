import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Storage from 'utils/Storage';
import configureStore from 'store';

import Main from 'containers/Main';

import LoginView from 'views/LoginView';
import DashboardView from 'views/DashboardView';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const checkIfAuthenticated = (nextState, replace, callback) => {
  const {token} = Storage.getItem('authenticated') || {};

  if (!token) {
    replace('/login');
  }

  callback();
};

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route components={Main}>
        <Redirect from="/" to="login" />
        <Route path="login" components={LoginView}/>
        <Route path="dashboard" components={DashboardView} onEnter={checkIfAuthenticated} />
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
