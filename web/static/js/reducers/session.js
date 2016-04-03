import actionTypes from 'constants/action-types';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SESSION_DELETE:
      return initialState;

    default:
      return state;
  }
}
