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

    case actionTypes.FETCH_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        collection: action.collection
      };

    case actionTypes.FETCH_RATES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
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
