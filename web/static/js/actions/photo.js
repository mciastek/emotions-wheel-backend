import actionTypes from 'constants/action-types';
import Connection from 'utils/Connection';
import Storage from 'utils/Storage';

export function photoFetchRequest() {
  return {
    type: actionTypes.PHOTO_FETCH_REQUEST
  };
}

export function photoFetchSuccess(single) {
  return {
    type: actionTypes.PHOTO_FETCH_SUCCESS,
    single
  };
}

export function photoFetchError(error) {
  return {
    type: actionTypes.PHOTO_FETCH_ERROR,
    error
  };
}

export function fetchPhoto(id) {
  return (dispatch) => {

    dispatch(photoFetchRequest());

    Connection.get(`/photos/${id}`)
      .then((data) => {
        const { photo } = data;
        dispatch(photoFetchSuccess(photo));
      })
      .catch(() => {});
  };
}

export function createPhoto(photo) {
  return (dispatch) => {

    dispatch(photoFetchRequest());

    Connection.post(`/photos`, null, {
      headers: {
        Accept: 'application/json',
        Authorization: Storage.getItem('authenticated').token
      },
      body: photo
    })
      .then((data) => {
        const { photo } = data;
        dispatch(photoFetchSuccess(photo));
      })
      .catch(() => {});
  };
}
