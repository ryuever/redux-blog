import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import configureStore from './store/configureStore'

import {Promise} from 'bluebird';

import routes from './routes'
import MakeRequest from './util/MakeRequest';

var initialState = {}

let loginRequest = {};
loginRequest.method = 'POST';
loginRequest.path = '/autologin';
var $autoLogin = MakeRequest.delay(loginRequest);

$autoLogin
  .then(function(account){
    let articleRequest = {};
    articleRequest.method = 'GET';
    articleRequest.path = '/articles';
    var $getArticle = MakeRequest.delay(articleRequest);

    let getTagRequest = {};
    getTagRequest.method = 'GET';
    getTagRequest.path = '/tags';
    var $getTagSuggestion = MakeRequest.delay(getTagRequest);

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
