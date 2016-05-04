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
