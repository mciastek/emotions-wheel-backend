import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function experimentsFetchRequest() {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_REQUEST
  };
}

export function experimentsFetchSuccess(collection) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_SUCCESS,
    collection
  };
}

export function experimentsFetchError(error) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_ERROR,
    error
  };
}

export function fetchExperiments() {
  return (dispatch) => {

    dispatch(experimentsFetchRequest());

    Connection.get('/experiments')
      .then((data) => {
        const { experiments } = data;
        dispatch(experimentsFetchSuccess(experiments));
      })
      .catch(() => {

      });
  };
}

export function deleteSingleExperiment(id) {
  return (dispatch) => {

    dispatch(experimentsFetchRequest());

    Connection.delete(`/experiments/${id}`)
      .then((data) => {
        const { experiments } = data;
        dispatch(experimentsFetchSuccess(experiments));
      })
      .catch(() => {

      });
  };
}
