import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchStatsRequest() {
  return {
    type: actionTypes.STATS_FETCH_REQUEST
  };
}

export function fetchStatsSuccess(single) {
  return {
    type: actionTypes.STATS_FETCH_SUCCESS,
    single
  };
}

export function fetchStatsError(error) {
  return {
    type: actionTypes.STATS_FETCH_ERROR,
    error
  };
}

export function fetchStats() {
  return (dispatch) => {

    dispatch(fetchStatsRequest());

    return Connection.get('/stats')
      .then((data) => {
        const { stats } = data;
        dispatch(fetchStatsSuccess(stats));
      })
      .catch(() => {});
  };
}
