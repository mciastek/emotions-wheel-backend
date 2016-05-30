import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchCountriesRequest() {
  return {
    type: actionTypes.COUNTRIES_FETCH_REQUEST
  };
}

export function fetchCountriesSuccess(collection) {
  return {
    type: actionTypes.COUNTRIES_FETCH_SUCCESS,
    collection
  };
}

export function fetchCountriesError(error) {
  return {
    type: actionTypes.COUNTRIES_FETCH_ERROR,
    error
  };
}

export function fetchCountries() {
  return (dispatch) => {

    dispatch(fetchCountriesRequest());

    return Connection.get('/countries')
      .then((data) => {
        const { countries } = data;
        dispatch(fetchCountriesSuccess(countries));
      })
      .catch(() => {});
  };
}
