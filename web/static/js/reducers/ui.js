import actionTypes from 'constants/action-types';

const initialState = {
  navOpen: false,
  qrDialog: {
    open: false,
    value: null
  }
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

    case actionTypes.UI_OPEN_QR_DIALOG:
      return {
        ...state,
        qrDialog: {
          ...state.qrDialog,
          open: true
        }
      };

    case actionTypes.UI_CLOSE_QR_DIALOG:
      return {
        ...state,
        qrDialog: {
          ...state.qrDialog,
          open: false
        }
      };

    case actionTypes.UI_QR_DIALOG_SET_VALUE:
      return {
        ...state,
        qrDialog: {
          ...state.qrDialog,
          value: action.value
        }
      };
    default:
      return state;
  }
}
