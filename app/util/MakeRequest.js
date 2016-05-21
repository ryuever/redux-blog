require('es6-promise').polyfill();
require('isomorphic-fetch');

import Helper from './Helper';

class MakeRequest{

  static send(request) {
    let url = '';
    let ApiEndPoint = '/api'
    let queryString = ''

    const { method, endPoint, path, unLoading, data, query } = request;

    if (endPoint) {
      ApiEndPoint = endPoint;
    }

    if (query) {
      queryString = `?${Helper.concatQueryString(query)}`;
    }

    url = `${ApiEndPoint}${path}${queryString}`;

    return fetch(url, {
      method: method,
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  static delay(request) {
    return new Promise((resolve, reject) => {
      MakeRequest.send(request)
                 .then((res) => {
                   if (res.status >= 400) {
                     reject();
                   }
                   return res.json();
                 })
                 .then((data) => {
                   resolve(data);
                 })

    })
  }
};

export default MakeRequest;
