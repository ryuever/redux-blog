import * as types from '../constants';

export function tagAddition(tag){

  return (dispatch, getState)=>{

    var suggestions = getState().tag.suggestions;

    for (var item in suggestions){
      if(item['name'] === tag)
        return false;
    }

    var data ={
      name: tag
    }

    $.ajax({
      type: "POST",
      url: '/api/tag',
      data: data
    })
     .done(function(tag){
       dispatch({
         type: types.CREATE_ARTICLE_TAG_REQUEST,
         tag: tag
       })
     })
     .fail(function(jqXHR){
       dispatch({
         type: types.CREATE_ARTICLE_TAG_FAILURE
       })
     })
  }
}

export function tagDelete(i){
  return {
    type: types.ARTICLE_TAG_DELETE,
    i: i
  }
}

export function tagDrag(tag, currPos, newPos){
  return {
    type: types.ARTICLE_TAG_DRAG,
    currPos: currPos,
    newPos: newPos,
    tag: tag
  }
}

export function clearNewArticleTags(){
  return {
    type: types.CLEAR_NEW_ARTICLE_TAGS
  }
}
