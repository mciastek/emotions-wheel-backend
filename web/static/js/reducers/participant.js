import actionTypes from 'constants/action-types';

const initialState = {
  single: {},
  loading: false,
  isOnline: false,
  photos: [],
  error: {}
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case actionTypes.PARTICIPANT_FETCH_REQUEST:
    case actionTypes.PARTICIPANT_PHOTOS_FETCH_REQUEST:
      return {
        ...state,
        loading: true
      };

    case actionTypes.PARTICIPANT_FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        single: action.single
      };

    case actionTypes.PARTICIPANT_FETCH_ERROR:
    case actionTypes.PARTICIPANT_PHOTOS_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case actionTypes.PARTICIPANT_PRESENCE_ONLINE:
    case actionTypes.PARTICIPANT_PRESENCE_OFFLINE:
      return {
        ...state,
        isOnline: action.isOnline
      };

    case actionTypes.PARTICIPANT_PHOTOS_FETCH_SUCCESS:
      return {
        ...state,
        photos: action.photos
      };

    default:
      return state;
  }
}
