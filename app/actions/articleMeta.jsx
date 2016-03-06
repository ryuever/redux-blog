import * as types from '../constants'

export function getArticleMeta(id){
  return (dispatch, getState) =>{
    $.ajax({
      type: "GET",
      url: "/api/articlemeta/"+id,
    })
     .done(function(articleMeta){
       dispatch({
         type: types.GET_ARTICLE_META_REQUEST,
         articleMeta: articleMeta
       })
     })
     .fail(function(jqXHR){
       return dispatch({
         type: types.GET_ARTICLE_META_FAILURE
       })
     })
  }
}

export function createArticleMeta(id){
  return (dispatch, getState) => {
    $.ajax({
      type: "POST",
      url: '/api/articlemeta',
      data: {articleId: id}
    })
     .done(function(articleMeta){
       dispatch({
         type: types.CREATE_ARTICLE_META_REQUEST,
         articleMeta: articleMeta
       })
     })
     .fail(function(jqXHR){
       dispatch({
         type: types.CREATE_ARTICLE_META_FAILURE
       })
     })
  }
}

export function updateArticleMeta(id,metasToUpdate){
  return (dispatch, getState) => {
    $.ajax({
      type: "PUT",
      url: "/api/articlemeta/"+id,
      data: {metasToUpdate: metasToUpdate}
    })
     .done(function(articleMeta){
       dispatch({
         type: types.UPDATE_ARTICLE_META_REQUEST,
         articleMeta: articleMeta
       })
     })
     .fail(function(jqXHR){
       dispatch({
         type: types.UPDATE_ARTICLE_META_FAILURE
       })

     })

  }
}
