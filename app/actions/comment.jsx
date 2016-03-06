import {polyfill} from 'es6-promise';
// import _ from 'lodash'
import pick from 'lodash/pick'

import * as types from '../constants';

export function createComment(content, articleId, creatorName, parent_slug){
  return (dispatch, getState) => {
    const data = {
      articleId,
      content,
      creatorName,
      parent_slug
    }

    $.ajax({
      type: "POST",
      url: "/api/comment",
      data: data
    })
     .done(function(comment){
       var tmp = pick(comment, ['articleId', '_id', 'content', 'creatorName', 'createDate', 'slug', 'full_slug']);
       dispatch({
         type: types.CREATE_COMMENT_REQUEST,
         comment: tmp
       })
     })
     .fail(function(jqXHR){
       dispatch({
         type: types.CREATE_COMMENT_FAILURE
       })
     })
  }
}

export function getComments(articleId){
  return (dispatch, getState) => {
    const data = {
      articleId
    }
    $.ajax({
      type: "GET",
      url: '/api/comments/'+articleId,
      data: data
    })
     .done(function(comments){
       var tmp = comments.map(function(comment){
         return pick(comment, ['content', 'articleId', '_id', 'slug', 'full_slug', 'creatorName', 'createDate']);
       });

       dispatch({
         type: types.GET_COMMENTS_REQUEST,
         articleId: articleId,
         comments: tmp
       })
     })
     .fail(function(jqXHR){
       dispatch({
         type: types.GET_COMMENTS_FAILURE
       })

     })
  }
}
