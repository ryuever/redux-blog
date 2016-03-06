import {
  CREATE_COMMENT_SUCCESS,
  CREATE_COMMENT_REQUEST,
  GET_COMMENTS_REQUEST
} from '../constants';

export default function comment (state = {
  comments: [{
    articleId: '',
    comments: []
  }]
}, action){

  let comments = [];
  let newComment = {};
  switch(action.type){
    case GET_COMMENTS_REQUEST:
      var commentList = action.comments;
      comments = state.comments;

      var articleId = action.articleId;
      var tmp = comments.map(function(comment){
        if(comment.articleId == articleId){
          return Object.assign({}, comment, {comments: commentList});
        }else{
          return comment;
        }
      });

      var hasKeyValue = comments.filter(function(comment){
        return (comment.articleId == articleId)
      });

      if (hasKeyValue.length == 0){
        tmp = [...comments, {articleId: articleId, comments: commentList}]
      }

      return Object.assign({}, state, {comments: tmp})

    case CREATE_COMMENT_REQUEST:
      newComment = action.comment;
      comments = state.comments

      var tmp = comments.map(function(comment){
        if (comment.articleId == newComment.articleId){
          return Object.assign({}, comment, {comments: [...comment.comments, newComment]})
        }else{
          return comment
        };
      });

      let hasKeyValue = comments.filter(function(comment){
        return (comment.articleId == newComment.articleId)
      });

      if (hasKeyValue.length == 0){
        tmp = [...comments, {articleId: newComment.articleId, comments: [newComment]}]
      }

      return Object.assign({}, state, {comments: tmp})

    default:
      return state;
  }
}
