export default class {

  static concatQueryOptions(options) {
    let queryString = '';
    let queryArr = [];

    for (let key in options){
      queryArr.push(key + '=' + options[key]);
    }
    queryString = queryArr.join('&');

    return queryString;
  }

}
