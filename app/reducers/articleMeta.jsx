import {
  GET_ARTICLE_META_REQUEST,
  GET_ARTICLE_META_FAILURE,
  CREATE_ARTICLE_META_REQUEST,
  CREATE_ARTICLE_META_FAILURE,
  UPDATE_ARTICLE_META_REQUEST,
  UPDATE_ARTICLE_META_FAILURE
} from '../constants'

export default function articleMeta (state={
  articleId: '',
  viewCount: 0,
  upVote: 0
}, action){
  switch (action.type){

    case CREATE_ARTICLE_META_REQUEST:
    case GET_ARTICLE_META_REQUEST:
    case UPDATE_ARTICLE_META_REQUEST:
      console.log("create article meta ", action.articleMeta);
      return Object.assign({}, state, action.articleMeta);

    case CREATE_ARTICLE_META_FAILURE:
      return state

    case GET_ARTICLE_META_FAILURE:
      return state

    default:
      return state;
  }
}
