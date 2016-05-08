import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function participantsFetchRequest() {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_REQUEST
  };
}

export function participantsFetchSuccess(collection) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_SUCCESS,
    collection
  };
}

export function participantsFetchError(error) {
  return {
    type: actionTypes.PARTICIPANTS_FETCH_ERROR,
    error
  };
}

export function fetchParticipants(getAllFree = false) {
  return (dispatch) => {

    const endpoint = (getAllFree) ? '/participants_free' : '/participants';

    dispatch(participantsFetchRequest());

    Connection.get(endpoint)
      .then((data) => {
        const { participants } = data;
        dispatch(participantsFetchSuccess(participants));
      })
      .catch(() => {

      });
  };
}

export function deleteSingleParticipant(id) {
  return (dispatch) => {

    dispatch(participantsFetchRequest());

    Connection.delete(`/participants/${id}`)
      .then((data) => {
        const { participants } = data;
        dispatch(participantsFetchSuccess(participants));
      })
      .catch(() => {

      });
  };
}
