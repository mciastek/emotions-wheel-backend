import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

import { fetchParticipants } from 'actions/participants';

export function experimentFetchRequest() {
  return {
    type: actionTypes.EXPERIMENT_FETCH_REQUEST
  };
}

export function experimentFetchSuccess(single) {
  return {
    type: actionTypes.EXPERIMENT_FETCH_SUCCESS,
    single
  };
}

export function experimentFetchError(error) {
  return {
    type: actionTypes.EXPERIMENT_FETCH_ERROR,
    error
  };
}

export function fetchExperiment(id) {
  return (dispatch) => {

    dispatch(experimentFetchRequest());

    Connection.get(`/experiments/${id}`)
      .then((data) => {
        const { experiment } = data;
        dispatch(experimentFetchSuccess(experiment));
      })
      .catch(() => {});
  };
}

export function createExperiment(experiment) {
  return (dispatch) => {

    dispatch(experimentFetchRequest());

    Connection.post(`/experiments`, { experiment })
      .then((data) => {
        const { experiment } = data;
        dispatch(experimentFetchSuccess(experiment));
      })
      .catch(() => {});
  };
}

export function updateExperiment(id, experiment) {
  return (dispatch) => {
    dispatch(experimentFetchRequest());

    Connection.put(`/experiments/${id}`, { experiment })
      .then((data) => {
        const { experiment } = data;
        dispatch(experimentFetchSuccess(experiment));
        dispatch(fetchParticipants(true));
      })
      .catch(() => {});
  };
}
