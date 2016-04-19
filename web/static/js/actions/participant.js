import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function participantRequest() {
  return {
    type: actionTypes.PARTICIPANT_REQUEST
  };
}

export function participantRequestSuccess(single) {
  return {
    type: actionTypes.PARTICIPANT_REQUEST_SUCCESS,
    single
  };
}

export function participantRequestError(error) {
  return {
    type: actionTypes.PARTICIPANT_REQUEST_ERROR,
    error
  };
}

export function fetchParticipant(id) {
  return (dispatch) => {

    dispatch(participantRequest());

    Connection.get(`/participants/${id}`)
      .then((data) => {
        const { participant } = data;
        dispatch(participantRequestSuccess(participant));
      })
      .catch(() => {});
  };
}

export function updateParticipant(id, participant) {
  return (dispatch) => {
    dispatch(participantRequest());

    Connection.put(`/participants/${id}`, { participant })
      .then((data) => {
        const { participant } = data;
        dispatch(participantRequestSuccess(participant));
      })
      .catch(() => {});
  };
}
