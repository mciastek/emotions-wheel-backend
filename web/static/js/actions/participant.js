import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function participantFetchRequest() {
  return {
    type: actionTypes.PARTICIPANT_FETCH_REQUEST
  };
}

export function participantFetchSuccess(single) {
  return {
    type: actionTypes.PARTICIPANT_FETCH_SUCCESS,
    single
  };
}

export function participantFetchError(error) {
  return {
    type: actionTypes.PARTICIPANT_FETCH_ERROR,
    error
  };
}

export function fetchParticipant(id) {
  return (dispatch) => {

    dispatch(participantFetchRequest());

    return Connection.get(`/participants/${id}`)
      .then((data) => {
        const { participant } = data;
        dispatch(participantFetchSuccess(participant));
      })
      .catch(() => {});
  };
}

export function createParticipant(participant) {
  return (dispatch) => {

    dispatch(participantFetchRequest());

    return Connection.post(`/participants`, { participant })
      .then((data) => {
        const { participant } = data;
        dispatch(participantFetchSuccess(participant));
      })
      .catch(() => {});
  };
}

export function updateParticipant(id, participant) {
  return (dispatch) => {
    dispatch(participantFetchRequest());

    return Connection.put(`/participants/${id}`, { participant })
      .then((data) => {
        const { participant } = data;
        dispatch(participantFetchSuccess(participant));
      })
      .catch(() => {});
  };
}
