import React, {Component, PropTypes} from 'react';

class ArticleCommentListItemFooter extends Component{
  constructor(props){
    super(props);
    this.onClickReply = this.onClickReply.bind(this);
  }

  onClickReply(){
    const {handleClickReply, slug}  = this.props;
    handleClickReply(slug);
  }

  render(){
    return(
      <div className="_rb-comment-list-item-footer">
        <a
         role="button"
         className="span"
         onClick={this.onClickReply}>回复</a>
      </div>
    )

  }

}

export default ArticleCommentListItemFooter
