import {polyfill} from 'es6-promise';
import md5 from 'spark-md5'
import _ from 'lodash'

import * as types from '../constants'
import {createArticleMeta} from './articleMeta'
import {clearNewArticleTags} from './tag'

export function titleTyping(text){
  console.log("text in article title typing action : ", text)
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
  console.log("return from article action");
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

    const data = {
      newTitle,
      newContent,
      tags
    };

    $.ajax({
      type: 'POST',
      data: data,
      url: '/api/article'
    })
     .done(function(article){
       console.log("post successful", article);
       dispatch(createArticleMeta(article._id));
       dispatch(clearNewArticleTags());
       dispatch(createArticleRequest(article));

     })
     .fail(function(jqXHR){
       console.log("post error");
     })
  }
}

export function getArticles(){
  return (dispatch, getState) => {
    console.log('get articles action');
    $.ajax({
      type: "GET",
      url: '/api/articles'
    })
     .done(function(articles){
       console.log("get articles successful !", articles);
       /* var tmp = articles.map(function(article){
          return _.pick(article, ['_id', 'content', 'title'])
          }); */

       return dispatch({
         type: types.GET_ARTICLES_REQUEST,
         articles: articles
       })
     })
     .fail(function(jqXHR){
       console.log("get articles error !");
       return dispatch({
         type: types.GET_ARTICLES_REQUEST
       })
     });
  }
}

export function getArticle(id){
  console.log("get article : ")
  return (dispatch, getState) => {
    $.ajax({
      type: "GET",
      url: "/api/article/"+id,
    })
     .done(function(article){
       // var tmp = _.pick(article, ['_id', 'content', 'title']);
       console.log("get article : ", article);
       return dispatch({
         type: types.GET_ARTICLE_REQUEST,
         presentArticle: article
       })
     })
     .fail(function(jqXHR){
       return dispatch({
         type: types.GET_ARTICLE_FAILURE
       })
     })
  }
}
