import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchLanguagesRequest() {
  return {
    type: actionTypes.LANGUAGES_FETCH_REQUEST
  };
}

export function fetchLanguagesSuccess(collection) {
  return {
    type: actionTypes.LANGUAGES_FETCH_SUCCESS,
    collection
  };
}

export function fetchLanguagesError(error) {
  return {
    type: actionTypes.LANGUAGES_FETCH_ERROR,
    error
  };
}

export function fetchLanguages() {
  return (dispatch) => {

    dispatch(fetchLanguagesRequest());

    return Connection.get('/languages')
      .then((data) => {
        const { languages } = data;
        dispatch(fetchLanguagesSuccess(languages));
      })
      .catch(() => {});
  };
}
