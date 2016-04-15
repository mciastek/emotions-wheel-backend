import actionTypes from 'constants/action-types';

const initialState = {
  collection: [],
  loading: false,
  error: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.COUNTRIES_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.COUNTRIES_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        collection: action.collection
      };

    case actionTypes.COUNTRIES_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    default:
      return state;
  }
}
