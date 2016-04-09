import actionTypes from 'constants/action-types';

export function toggleNav() {
  return {
    type: actionTypes.UI_TOGGLE_NAV
  };
}

export function closeNav() {
  return {
    type: actionTypes.UI_CLOSE_NAV
  };
}
