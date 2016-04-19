import actionTypes from 'constants/action-types';

const initialState = {
  single: {},
  loading: false,
  error: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PARTICIPANT_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PARTICIPANT_REQUEST_SUCCESS:
      return {
        ...state,
        loading: false,
        single: action.single
      };

    case actionTypes.PARTICIPANT_REQUEST_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
