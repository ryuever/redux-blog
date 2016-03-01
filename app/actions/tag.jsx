import * as types from '../constants';

export function tagAddition(tag){
  console.log("tag addition in action : ", tag);

  return (dispatch, getState)=>{

    var suggestions = getState().tag.suggestions;
    var newArticleTags = getState().tag.newArticleTag;
    var tagsShouldCreate = [];

    /* var newArticleTagsArr = newArticleTags.map(function(newArticleTag){
       return newArticleTag.text;
       }); */

    /* tagsShouldCreate = newArticleTagsArr.filter(function(newArticleTag){
       for (var item in suggestions){
       if(item['name'] === newArticleTag)
       return false;
       }
       return true;
       }); */

    for (var item in suggestions){
      if(item['name'] === tag)
        return false;
    }

    console.log("tags should update : ", tagsShouldCreate);

    var data ={
      name: tag
    }

    $.ajax({
      type: "POST",
      url: '/api/tag',
      data: data
    })
     .done(function(tag){
       console.log('suggestions from server : ', tag);
       dispatch({
         type: types.CREATE_ARTICLE_TAG_REQUEST,
         tag: tag
       })
     })
     .fail(function(jqXHR){
       console.log('error from server on create tags');
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

/* export function createTags(){
   return (dispatch, getState) =>{
 */


export function clearNewArticleTags(){
  return {
    type: types.CLEAR_NEW_ARTICLE_TAGS
  }
}
