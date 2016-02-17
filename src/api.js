const apiUri = (uri) => {
  uri = `/api/${uri}`;
  return uri;
};

const serialize = (data) => {
  const params = [];
  for (let param in data) {
    if (data.hasOwnProperty(param)) {
      const value = data[param];
      if (value != null) {
        params.push(encodeURIComponent(param) + '=' + encodeURIComponent(value));
      }
    }
  }
  return params.join('&');
};

const request = (method, uri, data) => {
  let promise = new Promise(function (resolve, reject) {
    const client = new XMLHttpRequest();
    const isFormData = data instanceof FormData;
    // TODO (cam-stitt): Use a token
    let token, body;

    let builtUri = apiUri(uri);

    if (data) {
      if (method.toUpperCase() === 'GET') {
        const queryString = serialize(data);
        if (queryString) {
          builtUri += `?${queryString}`;
        }
      } else {
        body = isFormData ? data : JSON.stringify(data);
      }
    }

    client.open(method, builtUri);

    if (token) {
      client.setRequestHeader('Authorization', `Bearer ${token}`);
    }
    if (!isFormData) {
      client.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    }

    client.send(body);

    client.onload = function() {
      if (this.status >= 200 && this.status < 300) {
        resolve(JSON.parse(this.response));
      } else {
        reject(this.statusText);
      }
    };

    client.onerror = function() {
      reject(this.statusText);
    }
  });

  return promise;
};

const Api = {
  submitForm: form => {
    const method = form.getAttribute('method');
    const uri = form.getAttribute('action');

    return request(method, uri, new FormData(form));
  },

  get: (...args) => {
    return request('GET', ...args);
  },

  post: (...args) => {
    return request('POST', ...args);
  },

  delete: (...args) => {
    return request('DELETE', ...args);
  },

  put: (...args) => {
    return request('PUT', ...args);
  },

  patch: (...args) => {
    return request('PATCH', ...args);
  }
};

export default Api;
