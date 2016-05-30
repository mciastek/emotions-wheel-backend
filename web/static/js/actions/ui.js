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

export function openQrDialog() {
  return {
    type: actionTypes.UI_OPEN_QR_DIALOG
  };
}

export function closeQrDialog() {
  return {
    type: actionTypes.UI_CLOSE_QR_DIALOG
  };
}

export function setQrDialogValue(value) {
  return {
    type: actionTypes.UI_QR_DIALOG_SET_VALUE,
    value
  };
}

export function openCustomDialog() {
  return {
    type: actionTypes.UI_OPEN_CUSTOM_DIALOG
  };
}

export function closeCustomDialog() {
  return {
    type: actionTypes.UI_CLOSE_CUSTOM_DIALOG
  };
}

export function setCustomDialogContent({ title, content, actions }) {
  return {
    type: actionTypes.UI_CUSTOM_DIALOG_SET_CONTENT,
    title,
    content,
    actions
  };
}

export function showNotificationBar() {
  return {
    type: actionTypes.UI_SHOW_NOTIFICATION_BAR
  };
}

export function hideNotificationBar() {
  return {
    type: actionTypes.UI_HIDE_NOTIFICATION_BAR
  };
}

export function setNotificationBarContent({ message, hideDuration = 2000 }) {
  return {
    type: actionTypes.UI_SET_NOTIFICATION_BAR_CONTENT,
    message,
    hideDuration
  };
}
