import { push } from 'react-router-redux';

import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function createSession() {
  return {
    type: actionTypes.SESSION_CREATE
  };
}

export function deleteSession() {
  return {
    type: actionTypes.SESSION_DELETE
  };
}

export function signIn(email, password) {
  return (dispatch) => {
    Connection.post('/session', {
      session: { email, password }
    })
    .then((data) => {
      localStorage.setItem('auth_token', data.token);

      dispatch(push('/dashboard'));

      dispatch(createSession());
      console.log(data)
    })
  };
}

export function signOut() {
  return (dispatch) => {
    Connection.delete('/session')
    .then(() => {
      localStorage.removeItem('auth_token');

      dispatch(push('/login'));

      dispatch(deleteSession());
    });
  };
}
