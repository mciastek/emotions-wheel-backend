import actionTypes from 'constants/action-types';

const initialState = {
  collection: [],
  loading: false,
  error: {},
  participantConnected: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.RATES_SOCKET_CONNECT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.RATES_SOCKET_CONNECT_SUCCESS:
      return {
        ...state,
        loading: false,
        collection: action.collection
      };

    case actionTypes.RATES_SOCKET_CONNECT_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.RATES_PARTICIPANT_CONNECTED:
      return {
        ...state,
        participantConnected: true
      };

    case actionTypes.RATES_PARTICIPANT_DISCONNECTED:
      return {
        ...state,
        participantConnected: false
      };

    case actionTypes.RATES_SOCKET_DISCONNECT_SUCCESS:
      return {
        ...state,
        collection: []
      };

    default:
      return state;
  }
}
