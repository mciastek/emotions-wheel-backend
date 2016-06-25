import 'core-js/fn/object/assign';
import injectTapEventPlugin from 'react-tap-event-plugin';

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, Redirect, IndexRoute, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import Storage from 'utils/Storage';
import configureStore from 'store';

import Main from 'containers/common/Main';

import LoginView from 'views/common/LoginView';

import DashboardView from 'views/common/DashboardView';
import DashboardIndexView from 'views/common/DashboardIndexView';

import ParticipantsView from 'views/participant/ParticipantsView';
import ParticipantEditView from 'views/participant/ParticipantEditView';
import ParticipantNewView from 'views/participant/ParticipantNewView';
import ParticipantPreview from 'containers/participant/ParticipantPreview';

import ExperimentsView from 'views/experiment/ExperimentsView';
import ExperimentNewView from 'views/experiment/ExperimentNewView';
import ExperimentEditView from 'views/experiment/ExperimentEditView';
import ExperimentPreviewView from 'views/experiment/ExperimentPreviewView';

import PhotosView from 'views/photo/PhotosView';
import PhotoCreate from 'containers/photo/PhotoCreate';

import QrCodePrint from 'containers/common/QrCodePrint';

const store = configureStore(browserHistory);
const history = syncHistoryWithStore(browserHistory, store);

const checkIfAuthenticated = (nextState, replace, callback) => {
  const {token} = Storage.getItem('authenticated') || {};

  if (!token) {
    replace('/login');
  }

  callback();
};

const setPageTitle = (pathname) => {
  const defaultTitle = 'Admin Panel';
  const regex = /\/dashboard\/([a-z]+)/g;
  const matched = regex.exec(pathname);

  if (matched) {
    document.title = `${defaultTitle} | ${matched[1][0].toUpperCase() + matched[1].slice(1)}`;
  } else {
    document.title = defaultTitle;
  }
};

injectTapEventPlugin();
history.listen(location => setPageTitle(location.pathname))

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={Main}>
        <Redirect from="/" to="login" />
        <Route path="login" component={LoginView}/>
        <Route path="dashboard" component={DashboardView} onEnter={checkIfAuthenticated}>
          <IndexRoute component={DashboardIndexView}/>

          <Route path="experiments">
            <IndexRoute component={ExperimentsView} />
            <Route path="new" component={ExperimentNewView} />
            <Route path=":id" component={ExperimentPreviewView} />
            <Route path="edit/:id" component={ExperimentEditView} />
          </Route>

          <Route path="participants">
            <IndexRoute component={ParticipantsView} />
            <Route path="new" component={ParticipantNewView} />
            <Route path=":id" component={ParticipantPreview} />
            <Route path="edit/:id" component={ParticipantEditView} />
            <Route path=":id/qr-code" component={QrCodePrint} />
          </Route>

          <Route path="photos">
            <IndexRoute component={PhotosView} />
            <Route path="new" component={PhotoCreate} />
          </Route>
        </Route>
      </Route>
    </Router>
  </Provider>
, document.getElementById('app'));
