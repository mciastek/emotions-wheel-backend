import { combineReducers }  from 'redux';
import { routerReducer } from 'react-router-redux';

import session from './session';
import ui from './ui';

export default combineReducers({
  routing: routerReducer,
  ui,
  session
});
