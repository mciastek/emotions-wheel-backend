import { createStore, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import reducers from 'reducers';

const loggerMiddleware = createLogger();

export default function configureStore(browserHistory) {
  const reduxRouterMiddleware = routerMiddleware(browserHistory);
  const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware, thunkMiddleware, loggerMiddleware)(createStore);

  return createStoreWithMiddleware(reducers);
}
