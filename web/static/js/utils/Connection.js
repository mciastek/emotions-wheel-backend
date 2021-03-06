import config from '../config';
import Storage from 'utils/Storage';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const buildHeaders = () => {
  const {token} = Storage.getItem('authenticated') || {};

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: token
  }
};

class Connection {
  constructor(url) {
    this.url = url;
  }

  get(endpoint) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'GET',
        headers: buildHeaders()
      })
      .then(checkStatus)
      .then((res) => res.json());
  }

  post(endpoint, params, options = {}) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(params),
        ...options
      })
      .then(checkStatus)
      .then((res) => res.json());
  }

  put(endpoint, params) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'PUT',
        headers: buildHeaders(),
        body: JSON.stringify(params)
      })
      .then(checkStatus)
      .then((res) => res.json());
  }

  delete(endpoint) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'DELETE',
        headers: buildHeaders()
      })
      .then(checkStatus)
      .then((res) => res.json());
  }
}

export default new Connection(`${config.api.url}${config.api.namespace}`);
