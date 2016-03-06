import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {createComment} from '../actions/comment';
import ArticleComments from '../containers/ArticleComments'
import ArticleCommentInput from '../components/ArticleCommentInput'

class ArticleComment extends Component {
  constructor(props){
    super(props);
    this.onCommentSubmit = this.onCommentSubmit.bind(this);
  }

  onCommentSubmit(text, creatorName){
    const {dispatch, articleId} = this.props
    dispatch(createComment(text, articleId, creatorName));
  }

  render(){
    return(
      <div>
        <ArticleComments
         articleId={this.props.articleId}/>
        <ArticleCommentInput
         onCommentSubmit={this.onCommentSubmit}/>
      </div>
    )
  }
}

ArticleComment.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(ArticleComment);
