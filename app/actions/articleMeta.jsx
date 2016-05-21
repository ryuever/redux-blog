import * as types from '../constants'
import MakeRequest from '../util/MakeRequest';

export function getArticleMeta(id){
  return (dispatch, getState) =>{

    let request = {};
    request.method = 'GET';
    request.path = `/articlemeta/${id}`;

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   return dispatch({
                     type: types.GET_ARTICLE_META_FAILURE
                   })
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((articleMeta) => {
                 dispatch({
                   type: types.GET_ARTICLE_META_REQUEST,
                   articleMeta: articleMeta
                 })
               });
  }
}

export function createArticleMeta(id){
  return (dispatch, getState) => {

    let request = {};
    request.method = 'POST'
    request.path = '/articlemeta';
    request.data = {
      articleId: id
    }

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.CREATE_ARTICLE_META_FAILURE
                   })
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((articleMeta) => {
                 dispatch({
                   type: types.CREATE_ARTICLE_META_REQUEST,
                   articleMeta: articleMeta
                 })
               });
  }
}

export function updateArticleMeta(id,metasToUpdate){
  return (dispatch, getState) => {

    let request = {};
    request.method = 'PUT'
    request.path = `/articlemeta/${id}`;
    request.data = {
      metasToUpdate: metasToUpdate
    }

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.UPDATE_ARTICLE_META_FAILURE
                   })
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((articleMeta) => {
                 dispatch({
                   type: types.UPDATE_ARTICLE_META_REQUEST,
                   articleMeta: articleMeta
                 })
               });
  }
}
