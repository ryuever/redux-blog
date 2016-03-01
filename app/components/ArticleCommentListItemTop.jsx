import React, {Component, PropTypes} from 'react';

class ArticleCommentListItemTop extends Component {

  render(){
    const {creatorName, createDate} = this.props;

    return(
      <div className="_rb-comment-list-item-top">
        <a role="button" className="">{creatorName}</a>
        <span>{createDate}</span>
      </div>
    )
  }
}

export default ArticleCommentListItemTop
