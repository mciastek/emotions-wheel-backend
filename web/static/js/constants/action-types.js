const fetchActions = ['request', 'success', 'error'];

const models = [
  'participants',
  'participant',
  'languages',
  'countries',
  'cities',
  'experiments',
  'experiment',
  'photos',
  'photo'
];

const actions = {
  SESSION_CREATE: 'SESSION_CREATE',
  SESSION_DELETE: 'SESSION_DELETE',
  SESSION_ERROR: 'SESSION_ERROR',
  SESSION_GET_CURRENT_USER: 'SESSION_GET_CURRENT_USER',

  UI_TOGGLE_NAV: 'UI_TOGGLE_NAV',
  UI_CLOSE_NAV: 'UI_CLOSE_NAV',

  UI_OPEN_CUSTOM_DIALOG: 'UI_OPEN_CUSTOM_DIALOG',
  UI_CLOSE_CUSTOM_DIALOG: 'UI_CLOSE_CUSTOM_DIALOG',
  UI_CUSTOM_DIALOG_SET_CONTENT: 'UI_CUSTOM_DIALOG_SET_CONTENT',

  UI_SHOW_NOTIFICATION_BAR: 'UI_SHOW_NOTIFICATION_BAR',
  UI_HIDE_NOTIFICATION_BAR: 'UI_HIDE_NOTIFICATION_BAR',
  UI_SET_NOTIFICATION_BAR_CONTENT: 'UI_SET_NOTIFICATION_BAR_CONTENT',

  UI_OPEN_PHOTO_FULL_PREVIEW: 'UI_OPEN_PHOTO_FULL_PREVIEW',
  UI_CLOSE_PHOTO_FULL_PREVIEW: 'UI_CLOSE_PHOTO_FULL_PREVIEW',
  UI_SET_PHOTO_FULL_PREVIEW_CONTENT: 'UI_SET_PHOTO_FULL_PREVIEW_CONTENT',

  RATES_SOCKET_CONNECT_REQUEST: 'RATES_SOCKET_CONNECT_REQUEST',
  FETCH_RATES_SUCCESS: 'FETCH_RATES_SUCCESS',
  FETCH_RATES_ERROR: 'FETCH_RATES_ERROR',
  RATES_SOCKET_DISCONNECT_SUCCESS: 'RATES_SOCKET_DISCONNECT_SUCCESS',

  RATES_PARTICIPANT_CONNECTED: 'RATES_PARTICIPANT_CONNECTED',
  RATES_PARTICIPANT_DISCONNECTED: 'RATES_PARTICIPANT_DISCONNECTED'
};

const generatedActions = (() => {
  return models.reduce((obj, type) => {
    const output = {};

    for (const action of fetchActions) {
      const actionName = `${type.toUpperCase()}_FETCH_${action.toUpperCase()}`
      output[actionName] = actionName;
    }

    return {
      ...obj,
      ...output
    };

  }, {});
})();

export default {
  ...actions,
  ...generatedActions
};
