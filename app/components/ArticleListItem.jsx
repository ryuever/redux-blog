import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router'

import ArticleListItemMeta from './ArticleListItemMeta'
import sanitizeHtml from 'sanitize-html'
// var sanitizeHtml = require('sanitize-html');

class ArticleListItem extends Component {

  render(){

    var displayTitle = sanitizeHtml(this.props.articleTitle, {allowedTags: []});
    var displayContent = sanitizeHtml(this.props.articleContent, {allowedTags: []});

    return(
      <div className="_rb-article-list-item" >
        <div><h2><Link to={"/article/"+this.props.id}
                  className="_rb-article-item-title" >{displayTitle}</Link></h2></div>
        <div className="_rb-tags">
          {this.props.articleTags.map(function(tag){
            return (<a key={tag._id}>{tag.name}</a>)
           })}
        </div>
        <div className="_rb-article-list-item-content _rb-article-excerpt">{displayContent}</div>
        <div className="_rb-article-list-item-meta">
          <ArticleListItemMeta
           articleCreateDate={this.props.articleCreateDate}/>
        </div>
        <hr className="_rb-article-divider" />
      </div>
    )
  }
}

export default ArticleListItem
