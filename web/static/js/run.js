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
import DashboardIndexView from 'views/DashboardIndexView';

import ParticipantsView from 'views/ParticipantsView';
import ParticipantEditView from 'views/ParticipantEditView';
import ParticipantNewView from 'views/ParticipantNewView';
import ParticipantPreview from 'containers/ParticipantPreview';

import ExperimentsView from 'views/ExperimentsView';
import ExperimentNewView from 'views/ExperimentNewView';
import ExperimentEditView from 'views/ExperimentEditView';
import ExperimentPreviewView from 'views/ExperimentPreviewView';

import PhotosView from 'views/PhotosView';
import PhotoCreate from 'containers/PhotoCreate';

import QrCodePrint from 'containers/QrCodePrint';

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
