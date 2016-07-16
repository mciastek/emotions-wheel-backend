import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchRatesRequest() {
  return {
    type: actionTypes.RATES_FETCH_REQUEST
  };
}

export function fetchRatesSuccess(collection) {
  return {
    type: actionTypes.RATES_FETCH_SUCCESS,
    collection
  };
}

export function fetchRatesError(error) {
  return {
    type: actionTypes.RATES_FETCH_ERROR,
    error
  };
}

export function fetchRates(experimentId, participantId) {
  return (dispatch) => {

    dispatch(fetchRatesRequest());

    return Connection.get(`/experiments/${experimentId}/participant/${participantId}/rates`)
      .then((data) => {
        const { rates } = data;
        dispatch(fetchRatesSuccess(rates));
      })
      .catch(() => {});
  };
}
