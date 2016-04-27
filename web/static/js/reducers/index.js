import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import session from './session';
import ui from './ui';
import participants from './participants';
import participant from './participant';
import languages from './languages';
import countries from './countries';
import cities from './cities';
import experiments from './experiments';
import experiment from './experiment';

export default combineReducers({
  routing: routerReducer,
  ui,
  session,
  participants,
  participant,
  languages,
  countries,
  cities,
  experiments,
  experiment
});
