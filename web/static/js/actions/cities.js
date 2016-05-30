import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchCitiesRequest() {
  return {
    type: actionTypes.CITIES_FETCH_REQUEST
  };
}

export function fetchCitiesSuccess(collection) {
  return {
    type: actionTypes.CITIES_FETCH_SUCCESS,
    collection
  };
}

export function fetchCitiesError(error) {
  return {
    type: actionTypes.CITIES_FETCH_ERROR,
    error
  };
}

export function fetchCities() {
  return (dispatch) => {

    dispatch(fetchCitiesRequest());

    return Connection.get('/cities')
      .then((data) => {
        const { cities } = data;
        dispatch(fetchCitiesSuccess(cities));
      })
      .catch(() => {});
  };
}
