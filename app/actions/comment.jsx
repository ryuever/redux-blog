import {polyfill} from 'es6-promise';
import _ from 'lodash'

import * as types from '../constants';

export function createComment(content, articleId, creatorName, parent_slug){
  return (dispatch, getState) => {
    console.log('runnnig create comment ');
    const data = {
      articleId,
      content,
      creatorName,
      parent_slug
    }
    console.log("in comment action : ", data);

    $.ajax({
      type: "POST",
      url: "/api/comment",
      data: data
    })
     .done(function(comment){
       var tmp = _.pick(comment, ['articleId', '_id', 'content', 'creatorName', 'createDate', 'slug', 'full_slug']);
       console.log("save comment : ", tmp);
       dispatch({
         type: types.CREATE_COMMENT_REQUEST,
         comment: tmp
       })
     })
     .fail(function(jqXHR){
       console.log("save comment error ");
       dispatch({
         type: types.CREATE_COMMENT_FAILURE
       })
     })
  }
}

export function getComments(articleId){
  console.log("article Id in action getComments: ", articleId)
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
       console.log('received comments : ',comments);
       var tmp = comments.map(function(comment){
         return _.pick(comment, ['content', 'articleId', '_id', 'slug', 'full_slug', 'creatorName', 'createDate']);
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
