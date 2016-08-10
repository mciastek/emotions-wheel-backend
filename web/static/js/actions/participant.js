import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';
import WebSocket from 'utils/WebSocket';
import PresenceStatus from 'utils/PresenceStatus';

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

export function participantPresenceOffline() {
  return {
    type: actionTypes.PARTICIPANT_PRESENCE_OFFLINE,
    isOnline: false
  };
}

export function participantPresenceOnline() {
  return {
    type: actionTypes.PARTICIPANT_PRESENCE_ONLINE,
    isOnline: true
  };
}

export function participantPhotosFetchRequest() {
  return {
    type: actionTypes.PARTICIPANT_PHOTOS_FETCH_REQUEST
  };
}

export function participantPhotosFetchSuccess(photos) {
  return {
    type: actionTypes.PARTICIPANT_PHOTOS_FETCH_SUCCESS,
    photos
  };
}

export function participantPhotosFetchError(error) {
  return {
    type: actionTypes.PARTICIPANT_PHOTOS_FETCH_ERROR,
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

export function checkParticipantPresence(participantId) {
  return (dispatch) => {
    if (!WebSocket.channel) {
      return dispatch(participantPresenceOffline());
    }

    const presenceState = new PresenceStatus(WebSocket.channel, participantId);

    presenceState.onChange = (isPresent) => {
      if (isPresent) {
        dispatch(participantPresenceOnline());
      } else {
        dispatch(participantPresenceOffline());
      }
    };
  };
}

export function fetchParticipantPhotos(id) {
  return (dispatch) => {
    dispatch(participantPhotosFetchRequest());

    return Connection.get(`/participants/${id}/photos`)
      .then((data) => {
        const { photos } = data;
        dispatch(participantPhotosFetchSuccess(photos));
      })
      .catch(() => {});
  };
}
