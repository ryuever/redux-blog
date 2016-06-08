require('es6-promise').polyfill();
import fetch from "isomorphic-fetch"
import { Promise } from 'es6-promise';

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

    url = `http://localhost:5000${ApiEndPoint}${path}${queryString}`;

    return fetch(url, {
      method: method,
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  }

  static delay(request) {
    return new Promise((resolve, reject) => {
      console.log('make reqest : ', MakeRequest.send(request));
      MakeRequest.send(request)
                 .then((res) => {
                   console.log('res status : ', res.status, res.json());
                   if (res.status >= 400) {
                     return reject();
                   }
                   return res.json();
                 })
                 .then((data) => {
                   console.log('res data : ', data);
                   resolve(data);
                 })

    })
  }
};

export default MakeRequest;
