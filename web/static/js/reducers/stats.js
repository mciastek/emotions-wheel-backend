import actionTypes from 'constants/action-types';

const initialState = {
  single: {},
  loading: false,
  error: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.STATS_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.STATS_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        single: action.single
      };

    case actionTypes.STATS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
