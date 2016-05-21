import * as types from '../constants';
import MakeRequest from '../util/MakeRequest';

export function tagAddition(tag){

  return (dispatch, getState)=>{

    var suggestions = getState().tag.suggestions;

    for (var item in suggestions){
      if(item['name'] === tag)
        return false;
    }

    let request = {};
    request.method = 'POST'
    request.path = '/tag';
    request.data = {
      name: tag
    }

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch({
                     type: types.CREATE_ARTICLE_TAG_FAILURE
                   })
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })

               .then((tag) => {
                 dispatch({
                   type: types.CREATE_ARTICLE_TAG_REQUEST,
                   tag: tag
                 })
               });
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
