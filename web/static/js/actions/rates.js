import actionTypes from 'constants/action-types';
import WebSocket from 'utils/WebSocket';

export function connectRatesSocketRequest() {
  return {
    type: actionTypes.RATES_SOCKET_CONNECT_REQUEST
  };
}

export function fetchRatesSuccess(collection) {
  return {
    type: actionTypes.FETCH_RATES_SUCCESS,
    collection
  };
}

export function connectRatesSocketError(error) {
  return {
    type: actionTypes.FETCH_RATES_ERROR,
    error
  };
}

export function disconnectRatesSocketSuccess() {
  return {
    type: actionTypes.RATES_SOCKET_DISCONNECT_SUCCESS
  };
}

export function participantConnected() {
  return {
    type: actionTypes.RATES_PARTICIPANT_CONNECTED
  };
}

export function participantDisconnected() {
  return {
    type: actionTypes.RATES_PARTICIPANT_DISCONNECTED
  };
}

export function connectRatesSocket(experimentId, participantId) {
  return (dispatch) => {
    dispatch(connectRatesSocketRequest());

    WebSocket.connect();

    WebSocket
      .join('experiment:results', { experiment_id: experimentId, participant_id: participantId })
      .receive('ok', ({ rates }) => {
        dispatch(fetchRatesSuccess(rates));
      });

    WebSocket.channel.on('experiment:new_rate', ({ rates }) => {
      dispatch(fetchRatesSuccess(rates));
    });

    WebSocket.channel.on('participant:presence', (data) => {
      console.log(data)
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
