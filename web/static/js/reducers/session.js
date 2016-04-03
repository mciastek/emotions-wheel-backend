import actionTypes from 'constants/action-types';

const initialState = {
  currentUser: {},
  error: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SESSION_DELETE:
      return initialState;

    case actionTypes.SESSION_ERROR:
      return {
        ...state,
        error: action.error
      };

    case actionTypes.SESSION_GET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.currentUser
      };

    default:
      return state;
  }
}
