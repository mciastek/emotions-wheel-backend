import actionTypes from 'constants/action-types';

const initialState = {
  navOpen: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.UI_TOGGLE_NAV:
      return {
        ...state,
        navOpen: !state.navOpen
      };

    case actionTypes.UI_CLOSE_NAV:
      return {
        ...state,
        navOpen: false
      };
    default:
      return state;
  }
}
