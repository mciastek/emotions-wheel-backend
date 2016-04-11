import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchParticipantRequest() {
  return {
    type: actionTypes.PARTICIPANT_FETCH_REQUEST
  };
}

export function fetchParticipantSuccess(single) {
  return {
    type: actionTypes.PARTICIPANT_FETCH_SUCCESS,
    single
  };
}

export function fetchParticipantError(error) {
  return {
    type: actionTypes.PARTICIPANT_FETCH_ERROR,
    error
  };
}

export function fetchParticipant(id) {
  return (dispatch) => {

    dispatch(fetchParticipantRequest());

    Connection.get(`/participants/${id}`)
      .then((data) => {
        const { participant } = data;
        dispatch(fetchParticipantSuccess(participant));
      })
      .catch(() => {});
  };
}

export function updateParticipant(id, participant) {
  return (dispatch) => {
    dispatch(fetchParticipantRequest());

    Connection.put(`/participants/${id}`, { participant })
      .then((data) => {
        const { participant } = data;
        dispatch(fetchParticipantSuccess(participant));
      })
      .catch(() => {});
  };
}
