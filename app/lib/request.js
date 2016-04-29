import {api} from 'config';

const serialize = data => {
  return Object.keys(data).map(key => {
    const value = data[key];

    return encodeURIComponent(key) + '=' + encodeURIComponent(value);
  }).join('&');
};

const getAccessData = () => {
  const access_token = localStorage.getItem('accessToken');
  if (access_token) {
    return {access_token};
  }
  return {};
};

const addDataToPath = (path, data) => {
  if (Object.keys(data).length) {
    const st = path.indexOf('?') === 0 ? '&' : '?'
    return path + st + serialize(data);
  }
  return path;
};

const headers = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

const request = {
  get(path, data) {
    data = Object.assign(data || {}, getAccessData());
    path = addDataToPath(path, data);

    return fetch(api.root + api.base + path).then(r => r.json());
  },
  post(path, body) {
    path = addDataToPath(path, getAccessData());

    return body
      ? fetch(api.root + api.base + path, {method: 'POST', body: JSON.stringify(body), headers}).then(r => r.json())
      : fetch(api.root + api.base + path, {method: 'POST'});
  },
  put(path, body) {
    path = addDataToPath(path, getAccessData());

    return body
      ? fetch(api.root + api.base + path, {method: 'PUT', body: JSON.stringify(body), headers})
      : fetch(api.root + api.base + path, {method: 'PUT'});
  },
  delete(path, body) {
    path = addDataToPath(path, getAccessData());

    return fetch(api.root + api.base + path, {method: 'DELETE'});
  }
};

export default request;
