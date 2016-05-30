import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

import ArticleListItemMeta from './ArticleListItemMeta'
import sanitizeHtml from 'sanitize-html'
// var sanitizeHtml = require('sanitize-html');

class ArticleListItem extends Component {
  constructor(props) {
    super(props);

    this._clickColumn = this._clickColumn.bind(this);
  }

  _clickColumn() {
    let router = this.context.router;

    router.push({
      pathname: `/article/${this.props.id}`
    })
  }

  render(){

    var displayTitle = sanitizeHtml(this.props.articleTitle, {allowedTags: []});
    var displayContent = sanitizeHtml(this.props.articleContent, {allowedTags: []});

    return(
      <div className="rb-article-list-item" >
        <div className="rb-article-post-meta-social meta-grey">
          {`Posted at ${this.props.articleCreateDate}`}
        </div>
        <div className="rb-article-single-column" onClick={this._clickColumn}>
          <div>
            <Link to={"/article/"+this.props.id} className="rb-article-item-title" >
            <h2>{displayTitle}</h2>
            <div className="rb-tags">
              {this.props.articleTags.map((tag) => {
                return (
                  <a key={tag._id}>{tag.name}</a>
                )
               })}
            </div>
            <div className="rb-article-list-item-content rb-article-excerpt">{displayContent}</div>
          </Link>
          </div>
        </div>
        <div className="rb-post-preview-footer-meta">
          <div className="rb-post-preview-footer-readmore meta-grey">
            <Link to={"/article/"+this.props.id}>{`Read more...`}</Link>
          </div>
          <ArticleListItemMeta
           articleCreateDate={this.props.articleCreateDate}/>
        </div>
      </div>
    )
  }
}

ArticleListItem.contextTypes = {
  router: PropTypes.object.isRequired
}

export default ArticleListItem
