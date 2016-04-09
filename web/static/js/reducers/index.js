import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import session from './session';
import ui from './ui';
import participants from './participants';

export default combineReducers({
  routing: routerReducer,
  ui,
  session,
  participants
});
