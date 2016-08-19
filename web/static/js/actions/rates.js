import actionTypes from 'constants/action-types';
import WebSocket from 'utils/WebSocket';
import Connection from 'utils/Connection';

export function connectRatesSocketRequest() {
  return {
    type: actionTypes.RATES_SOCKET_CONNECT_REQUEST
  };
}

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

export function connectRatesSocketError(error) {
  return {
    type: actionTypes.RATES_FETCH_ERROR,
    error
  };
}

export function disconnectRatesSocketSuccess() {
  return {
    type: actionTypes.RATES_SOCKET_DISCONNECT_SUCCESS
  };
}

export function connectRatesSocket(experimentId, participantId) {
  return (dispatch) => {
    dispatch(connectRatesSocketRequest());

    WebSocket.connect();

    WebSocket
      .join('admin:results', { experiment_id: experimentId, participant_id: participantId })
      .receive('ok', ({ rates }) => {
        dispatch(fetchRatesSuccess(rates));
      });

    WebSocket.channel.on('experiment:new_rate', ({ rates }) => {
      dispatch(fetchRatesSuccess(rates));
    });
  };
}

export function disconnectRatesSocket() {
  return (dispatch) => {
    WebSocket
      .leave()
      .receive('ok', () => {
        dispatch(disconnectRatesSocketSuccess());
      });
  };
}

export function deleteRatesForParticipant(experimentId, participantId) {
  return (dispatch) => {
    dispatch(fetchRatesRequest());

    return Connection.delete(`/experiments/${experimentId}/participants/${participantId}/rates`)
      .catch(() => {});
  };
}
