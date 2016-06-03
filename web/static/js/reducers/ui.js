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
  },
  notificationBar: {
    visible: false,
    message: '',
    hideDuration: 2000
  },
  photoFullPreview: {
    open: false,
    image: null
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

    case actionTypes.UI_SHOW_NOTIFICATION_BAR:
      return {
        ...state,
        notificationBar: {
          ...state.notificationBar,
          visible: true
        }
      };

    case actionTypes.UI_HIDE_NOTIFICATION_BAR:
      return {
        ...state,
        notificationBar: {
          ...state.notificationBar,
          visible: false
        }
      };

    case actionTypes.UI_SET_NOTIFICATION_BAR_CONTENT:
      return {
        ...state,
        notificationBar: {
          ...state.notificationBar,
          message: action.message,
          hideDuration: action.hideDuration
        }
      };

    case actionTypes.UI_OPEN_PHOTO_FULL_PREVIEW:
      return {
        ...state,
        photoFullPreview: {
          ...state.photoFullPreview,
          open: true
        }
      };

    case actionTypes.UI_CLOSE_PHOTO_FULL_PREVIEW:
      return {
        ...state,
        photoFullPreview: {
          ...state.photoFullPreview,
          open: false
        }
      };

    case actionTypes.UI_SET_PHOTO_FULL_PREVIEW_CONTENT:
      return {
        ...state,
        photoFullPreview: {
          ...state.photoFullPreview,
          image: action.image
        }
      };
    default:
      return state;
  }
}
