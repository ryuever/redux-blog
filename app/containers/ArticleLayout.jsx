import React, {Component, PropTypes} from 'react';

class ArticleLayout extends Component {
  render(){
    return(
      <div className="rb-article-main">
        {this.props.children}
      </div>
    )
  }
}

export default ArticleLayout;
