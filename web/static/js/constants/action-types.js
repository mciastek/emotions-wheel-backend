const fetchActions = ['request', 'success', 'error'];

const models = [
  'participants',
  'participant',
  'languages',
  'countries',
  'cities',
  'experiments',
  'experiment'
];

const actions = {
  SESSION_CREATE: 'SESSION_CREATE',
  SESSION_DELETE: 'SESSION_DELETE',
  SESSION_ERROR: 'SESSION_ERROR',
  SESSION_GET_CURRENT_USER: 'SESSION_GET_CURRENT_USER',

  UI_TOGGLE_NAV: 'UI_TOGGLE_NAV',
  UI_CLOSE_NAV: 'UI_CLOSE_NAV'
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
