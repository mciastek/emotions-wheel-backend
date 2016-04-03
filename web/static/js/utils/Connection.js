import config from '../config';

const checkStatus = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    let error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const requestHeaders = (() => {
  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: localStorage.getItem('auth_token')
  }
})();

class Connection {
  constructor(url) {
    this.url = url;
  }

  get(endpoint) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'GET',
        headers: requestHeaders
      })
      .then(checkStatus)
      .then((res) => res.json());
  }

  post(endpoint, params) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'POST',
        headers: requestHeaders,
        body: JSON.stringify(params)
      })
      .then(checkStatus)
      .then((res) => res.json());
  }

  delete(endpoint) {
    return fetch(`${this.url}${endpoint}`, {
        method: 'DELETE',
        headers: requestHeaders
      })
      .then(checkStatus);
  }
}

export default new Connection(`${config.api.url}${config.api.namespace}`);
