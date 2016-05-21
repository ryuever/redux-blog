import * as types from '../constants'
import MakeRequest from '../util/MakeRequest';

import {createArticleMeta} from './articleMeta'
import {clearNewArticleTags} from './tag'
import { browserHistory } from 'react-router'

export function titleTyping(text){
  return{
    type: types.TITLE_TYPING,
    articleTitle: text
  }
}

export function contentTyping(text){
  return {
    type: types.CONTENT_INPUT_TYPING,
    articleContent: text
  }
}

function createArticleRequest(article){
  let articleId = article._id;

  return {
    type: types.CREATE_ARTICLE_REQUEST,
    article: article
  }
}

export function createArticle(){
  return (dispatch, getState) => {
    const {newArticle} = getState().article;
    const tags = getState().tag.newArticleTag;
    const newTitle = '<h1>' + newArticle.articleTitle + '</h1>';
    const newContent = newArticle.articleContent;

    let request = {};
    request.method = 'POST'
    request.path = '/article';
    request.data = {
      newTitle,
      newContent,
      tags
    }

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   console.log("post error");
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })

               .then((article) => {
                 dispatch(createArticleMeta(article._id));
                 dispatch(clearNewArticleTags());
                 dispatch(createArticleRequest(article));
                 browserHistory.push('/articles')
               });
  }
}

export function getArticles(){
  return (dispatch, getState) => {
    let request = {};
    request.method = 'GET'
    request.path = '/articles';

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.GET_ARTICLES_REQUEST
                   });
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((articles) => {
                 console.log('articles : ', articles);
                 dispatch({
                   type: types.GET_ARTICLES_REQUEST,
                   articles: articles
                 })
               });
  }
}

export function getArticle(id){
  return (dispatch, getState) => {

    let request = {};
    request.method = 'GET'
    request.path = `/article/${id}`;

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.GET_ARTICLE_FAILURE
                   });
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((article) => {
                 dispatch({
                   type: types.GET_ARTICLE_REQUEST,
                   presentArticle: article
                 })
               });
  }
}
