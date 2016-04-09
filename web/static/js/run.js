import 'core-js/fn/object/assign';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Storage from 'utils/Storage';
import configureStore from 'store';

import Main from 'containers/Main';

import LoginView from 'views/LoginView';
import DashboardView from 'views/DashboardView';
import ParticipantsView from 'views/ParticipantsView';
import ParticipantView from 'views/ParticipantView';

import DashboardContainer from 'containers/DashboardContainer';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const checkIfAuthenticated = (nextState, replace, callback) => {
  const {token} = Storage.getItem('authenticated') || {};

  if (!token) {
    replace('/login');
  }

  callback();
};

injectTapEventPlugin();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route components={Main}>
        <Redirect from="/" to="login" />
        <Route path="login" components={LoginView}/>
        <Route path="dashboard" components={DashboardView} onEnter={checkIfAuthenticated}>
          <IndexRoute component={DashboardContainer}/>
          <Route path="participants" components={ParticipantsView} />
          <Route path="participants/:id" components={ParticipantView} />
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
