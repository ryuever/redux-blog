import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ArticleComment from './ArticleComment';

import {getArticle} from '../actions/article';
import {updateArticleMeta} from '../actions/articleMeta'

import showdown from 'showdown';

import hljs from 'highlight.js';

// refer to https://github.com/showdownjs/showdown/issues/215
showdown.extension('codehighlight', function() {
  function htmlunencode(text) {
    return (
      text
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
      );
  }
  return [
    {
      type: 'output',
      filter: function (text, converter, options) {
        // use new shodown's regexp engine to conditionally parse codeblocks
        var left  = '<pre><code\\b[^>]*>',
            right = '</code></pre>',
            flags = 'g',
            replacement = function (wholeMatch, match, left, right) {
              // unescape match to prevent double escaping
              match = htmlunencode(match);
              return left + hljs.highlightAuto(match).value + right;
            };
        return showdown.helper.replaceRecursiveRegExp(text, replacement, left, right, flags);
      }
    }
  ];
});

const converter = new showdown.Converter({extensions: ['codehighlight']});

class Article extends Component {
  constructor(props){
    super(props);
    const {dispatch} = this.props;
    const id = this.props.params.id
    dispatch(getArticle(id));
   }

  componentDidMount(){
    const {dispatch} = this.props;
    const id = this.props.params.id

    dispatch(updateArticleMeta(id, {viewCount: 1}));
  }

  render(){
    let convertedHtml = converter.makeHtml(this.props.presentContent || '');

    return(
      <section>
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.presentTitle)}} />
        <div className="rb-article-meta">
          <span>浏览{this.props.viewCount}</span>
          <span>喜欢{this.props.upVote}</span>
        </div>

        <div className="markdown-body" dangerouslySetInnerHTML={{__html: convertedHtml}} />
        <ArticleComment
         articleId={this.props.params.id}
        />
      </section>
    )
  }
}

Article.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps(state){
  return {
    presentTitle: state.article.presentArticle.title,
    presentContent: state.article.presentArticle.content,
    presentId: state.article.presentArticle.id,
    upVote: state.articleMeta.upVote,
    viewCount: state.articleMeta.viewCount
  }
}

export default connect(mapStateToProps)(Article)
