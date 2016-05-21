require('es6-promise').polyfill();
require('isomorphic-fetch');

import Helper from './Helper';

class MakeRequest{

  static get(req) {
    const {url, query} = req;

    let location = url
    if (query) {
      let queryString = Helper.concatQueryString(query);
      location = `${url}?${queryString}`;
    }

    return fetch(location, {
      method: 'GET',
      credentials: 'same-origin'
    });
  }

  static post(req) {
    const {url, query, data} = req

    let location = url
    if (query) {
      let queryString = Helper.concatQueryString(query);
      location = `${url}?${queryString}`;
    }

    return fetch(location, {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  };
};

export default MakeRequest;
