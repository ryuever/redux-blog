import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ArticleCommentListItem from '../components/ArticleCommentListItem';

import {getComments, createComment} from '../actions/comment';

class ArticleComments extends Component{
  constructor(props){
    super(props);
    this.onSubmitCommentReply = this.onSubmitCommentReply.bind(this);
  }

  componentDidMount(){
    console.log('component did mount in articles');
    const {dispatch, articleId} = this.props;
    console.log('articleId in article comments container : ',articleId);
    dispatch(getComments(articleId));
  }

  onSubmitCommentReply(reply, articleId, replyName, parent_slug){
    // console.log ('reply ++++++, ', this);
    console.log('type of ', typeof(this.props));
    const {dispatch} = this.props;
    dispatch(createComment(reply, articleId, replyName, parent_slug));
  }

  render(){
    const {commentList} = this.props;
    console.log("comments from : ", commentList);

    if (commentList){
      return(
        <secion className="_rb-comment-list">
          <ArticleCommentListItem
           commentList ={commentList}
           onSubmitCommentReply={this.onSubmitCommentReply}
          />
        </secion>
      )
    }

    return(
      <div> Input your comments </div>
    )
  }
}

ArticleComments.propTypes = {
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  let articleId = state.article.presentArticle.id;

  let comments = state.comment.comments.filter(function(comment){
    return (comment.articleId == articleId);
  });

  return ({
    commentList: comments[0]
  })
}

export default connect(mapStateToProps)(ArticleComments)
