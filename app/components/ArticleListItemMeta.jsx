import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class ArticleListItemMeta extends Component {

  render(){
    return(
      <div className="_rb-article-item-meta">
        <span>{this.props.articleCreateDate}</span>
        <span className="_rb-article-item-meta-link">continuted</span>
      </div>
    )
  }
}
