import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';

export function photosFetchRequest() {
  return {
    type: actionTypes.PHOTOS_FETCH_REQUEST
  };
}

export function photosFetchSuccess(collection) {
  return {
    type: actionTypes.PHOTOS_FETCH_SUCCESS,
    collection
  };
}

export function photosFetchError(error) {
  return {
    type: actionTypes.PHOTOS_FETCH_ERROR,
    error
  };
}

export function fetchPhotos() {
  return (dispatch) => {

    dispatch(photosFetchRequest());

    return Connection.get('/photos')
      .then((data) => {
        const { photos } = data;
        dispatch(photosFetchSuccess(photos));
      })
      .catch(() => {});
  };
}

export function deleteSinglePhoto(id) {
  return (dispatch) => {

    dispatch(photosFetchRequest());

    return Connection.delete(`/photos/${id}`)
      .then((data) => {
        const { photos } = data;
        dispatch(photosFetchSuccess(photos));
      })
      .catch(() => {});
  };
}
