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

class Connection {
  constructor(url) {
    this.url = url;
  }

  get(endpoint) {
    return fetch(`${this.url}/${endpoint}`, {
      method: 'GET'
    })
    .then(checkStatus)
    .then((res) => JSON.parse(res));
  }

  post(endpoint) {
    return fetch(`${this.url}/${endpoint}`, {
      method: 'POST'
    })
    .then(checkStatus);
  }

  delete(endpoint) {
    return fetch(`${this.url}/${endpoint}`, {
      method: 'DELETE'
    })
    .then(checkStatus);
  }
}

export default new Connection(`${config.api.url}${config.api.namespace}`);
