import {polyfill} from 'es6-promise';
import MakeRequest from '../util/MakeRequest';
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

    let request = {};
    request.method = 'POST'
    request.path = '/comment';
    request.data = data;

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.CREATE_COMMENT_FAILURE
                   });
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((comment) => {
                 var tmp = pick(comment, [
                   'articleId', '_id', 'content',
                   'creatorName', 'createDate', 'slug',
                   'full_slug'
                 ]);

                 dispatch({
                   type: types.CREATE_COMMENT_REQUEST,
                   comment: tmp
                 });
               });

  }
}

export function getComments(articleId){
  return (dispatch, getState) => {

    let request = {};
    request.method = 'GET'
    request.path = `/comments/${articleId}`;

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.GET_COMMENTS_FAILURE
                   });
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((comments) => {

                 var tmp = comments.map(function(comment){
                   return pick(comment, [
                     'content', 'articleId', '_id',
                     'slug', 'full_slug', 'creatorName',
                     'createDate']
                   );
                 });

                 dispatch({
                   type: types.GET_COMMENTS_REQUEST,
                   articleId: articleId,
                   comments: tmp
                 });
               });
  }
}
