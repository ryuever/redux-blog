import {Promise} from 'bluebird'

function ajaxPromise(type, url){
  console.log('processing type url', type, url);
  var promise = new Promise(function(resolve, reject){
    $.ajax({
      type: type,
      url: url
    })
     .done(function(data){
       return resolve(data)
     })
     .fail(function(jqXHR){
       return reject()
     })
  });

  return promise;
}

export function initial(){
  var $autoLogin = ajaxPromise('POST', '/login');

  var $getArticle = ajaxPromise('GET', '/api/articles');

  $autoLogin
  .then(function())

}
