import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

export default class ArticleListItemMeta extends Component {

  render(){
    console.log('create date : ', this.props.articleCreateDate);
    return(
      <div className="_rb-article-meta">
        <span>{this.props.articleCreateDate}</span>
        <span>tag</span>
        <span className="_rb-article-meta-link">continuted</span>
      </div>
    )
  }
}
