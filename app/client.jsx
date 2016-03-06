import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import configureStore from './store/configureStore'

import {Promise} from 'bluebird';

import routes from './routes'

var initialState = {}
// const initialState = window.__INITIAL_STATE__

function ajaxPromise(type, url){
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

var $autoLogin = ajaxPromise('POST', '/api/autologin');

$autoLogin
  .then(function(account){
    var $getArticle = ajaxPromise('GET', '/api/articles');
    var $getTagSuggestion = ajaxPromise('GET', '/api/tags');

    Promise.all([$getArticle, $getTagSuggestion])
           .spread(function(articles, tags){
             initialState = {
               article:{
                 articles: articles,
                 presentArticle: {},
                 newArticle:{
                   articleTitle: '',
                   articleContent: ''
                 }
               },
               user: {
                 authenticated: account._id ? true:false,
                 isWaiting: false,
                 account: account
               },
               tag: {
                 newArticleTag: [],
                 suggestions: tags
               }
             }

             const store = configureStore(initialState, browserHistory);

             render(
               <Provider store={store}>
                 <Router history={browserHistory}>
                   {routes}
                 </Router>
               </Provider>
               , document.getElementById('app')
             );
           })
  })
  .catch(function(err){
    if(err){
      console.log("return error from client");
    }
  })
