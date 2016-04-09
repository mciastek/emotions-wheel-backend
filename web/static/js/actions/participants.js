import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function fetchParticipantsRequest() {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_REQUEST
  };
}

export function fetchParticipantsSuccess(collection) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_SUCCESS,
    collection
  };
}

export function fetchParticipantsError(error) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_ERROR,
    error
  };
}

export function fetchParticipants() {
  return (dispatch) => {

    dispatch(fetchParticipantsRequest());

    Connection.get('/participants')
      .then((data) => {
        dispatch(fetchParticipantsSuccess(data));
      })
      .catch(() => {

      })
  };
}
