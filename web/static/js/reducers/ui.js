import actionTypes from 'constants/action-types';

const initialState = {
  navOpen: false,
  qrDialog: {
    open: false,
    value: null
  },
  customDialog: {
    title: null,
    content: null,
    actions: [],
    open: false
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

    case actionTypes.UI_OPEN_CUSTOM_DIALOG:
      return {
        ...state,
        customDialog: {
          ...state.customDialog,
          open: true
        }
      };

    case actionTypes.UI_CLOSE_CUSTOM_DIALOG:
      return {
        ...state,
        customDialog: {
          ...state.customDialog,
          open: false
        }
      };

    case actionTypes.UI_CUSTOM_DIALOG_SET_CONTENT:
      return {
        ...state,
        customDialog: {
          ...state.customDialog,
          title: action.title,
          content: action.content,
          actions: action.actions
        }
      };
    default:
      return state;
  }
}
