import {
  ARTICLE_TAG_ADDITION,
  ARTICLE_TAG_DELETE,
  ARTICLE_TAG_DRAG,
  CREATE_ARTICLE_TAG_REQUEST,
  CREATE_ARTICLE_TAG_FAILURE,
  CLEAR_NEW_ARTICLE_TAGS
} from '../constants';

export default function tag (state={
  // {id: 0, text: ''}
  newArticleTag: [],
  suggestions: []
}, action){
  let newArticleTag = [];
  let originArticleTag = [];
  let newSuggestions = [];
  switch (action.type){
    case CREATE_ARTICLE_TAG_REQUEST:
      originArticleTag = [...state.newArticleTag, {
        id: action.tag._id,
        text: action.tag.name
      }];

      newSuggestions = [...state.suggestions, action.tag];
      return Object.assign({}, state, {newArticleTag: originArticleTag, suggestions: newSuggestions});

    case CREATE_ARTICLE_TAG_FAILURE:
      return state

    case ARTICLE_TAG_ADDITION:
      originArticleTag = [...state.newArticleTag, {
        id: state.newArticleTag.length + 1,
        text: action.tag
      }];

      /* newArticleTag = state.suggestions.filter(function(suggestion){
         return (suggestion.name === action.tag)
         });

         if (newArticleTag.length > 0)
         suggestions = [...state.suggestions, ] */

      return Object.assign({}, state, {newArticleTag: originArticleTag});

    case ARTICLE_TAG_DELETE:
      originArticleTag = [...state.newArticleTag]
      originArticleTag.splice(action.id, 1);
      return Object.assign({}, state, {newArticleTag: originArticleTag});

    case ARTICLE_TAG_DRAG:
      originArticleTag = [...state.newArticleTag]
      originArticleTag.splice(action.currPos, 1);
      originArticleTag.splice(action.newPos, 0, action.tag);
      return Object.assign({}, state, {newArticleTag: originArticleTag});

    case CLEAR_NEW_ARTICLE_TAGS:
      return Object.assign({}, state, {newArticleTag: []});

    default:
      return state
  }
}
