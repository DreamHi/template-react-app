import fetch from 'axios';
import createHistory from "history/createBrowserHistory";
import { ROUTE_LOGIN } from './constants';
import storage from './storage';

const history = createHistory({forceRefresh: true});
fetch.defaults.baseURL = `${process.env.API_URL}/template`;

function setHeaderToken() {
  const token = storage.getToken();
  return { "x-token-template": `${token}` };
}

function checkAuth(err, callback) {
  console.log(err);
  if (err.response.data.errorCode === 401) {
    storage.removeAuthenticateUser();
    history.push(ROUTE_LOGIN);
  }
  callback(err.response.data, undefined);
}

export function get(url, obj = {}, callback) {

  const options = {
    params: obj,
    headers: setHeaderToken(),
  };
  fetch.get(url, options)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}

export function post(url, data = {}, callback) {

  const options = {
    headers: setHeaderToken(),
  };

  options.headers['Content-Type'] = 'application/json';
  fetch.post(url, data, options)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}

export function put(url, obj = {}, callback) {

  const options = {
    headers: setHeaderToken(),
  };

  options.headers['Content-Type'] = 'application/json';
  fetch.put(url, obj, options)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}

export function remove(url, callback) {

  const options = {
    headers: setHeaderToken(),
  };

  fetch.delete(url, options)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}

export function upload(url, obj = {}, callback) {

  const options = {
    headers: {
      'Content-Type': obj.type,
    },
  };

  fetch.put(url, obj, options)
    .then((response) => {
      callback(undefined, response.data.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}

export function pdfOutput(url, name = 'report', data) {

  fetch({
    method: 'post',
    url,
    data,
    responseType: 'arraybuffer',
    headers: setHeaderToken(),
  })
    .then((response) => {
      const blob = new Blob([response.data], { type: 'application/pdf' } );
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = `${name}.pdf`;
      link.click();
    });
}

export function zipOutput(url, data, callback) {

  fetch({
    method: 'post',
    url,
    data,
    responseType: 'arraybuffer',
    headers: setHeaderToken(),
  })
    .then((response) => {
      callback(undefined, response.data);
    })
    .catch((error) => {
      checkAuth(error, callback);
    });
}