import { push } from 'react-router-redux';

import Connection from 'utils/Connection';
import Storage from 'utils/Storage';
import actionTypes from 'constants/action-types';

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

export function getSessionError(error) {
  return {
    type: actionTypes.SESSION_ERROR,
    error
  };
}

export function populateCurrentUser(currentUser) {
  return {
    type: actionTypes.SESSION_GET_CURRENT_USER,
    currentUser
  }
}

export function signIn(email, password) {
  return (dispatch) => {
    Connection.post('/session', {
      session: { email, password }
    })

    .then((data) => {
      const {token, user_id} = data;

      Storage.setItem('authenticated', { token, user_id });

      dispatch(push('/dashboard'));

      dispatch(createSession());
    })

    .catch((error) => {
      error.response.json()
        .then((data) => {
          dispatch(getSessionError(data));
        });
    });
  };
}

export function signOut() {
  return (dispatch) => {
    Connection.delete('/session')

    .then(() => {
      Storage.setItem('authenticated', {});

      dispatch(push('/login'));

      dispatch(deleteSession());
    });
  };
}

export function fetchCurrentUser() {
  return (dispatch) => {
    const {user_id} = Storage.getItem('authenticated');

    Connection.get(`/researchers/${user_id}`)

    .then((data) => {
      dispatch(populateCurrentUser(data.researcher));
    })
  };
}
