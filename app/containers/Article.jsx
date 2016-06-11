import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ArticleComment from './ArticleComment';

import {getArticle} from '../actions/article';
import {updateArticleMeta} from '../actions/articleMeta'

import showdown from 'showdown';

const converter = new showdown.Converter();

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
    return(
      <section>
        <div dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.presentTitle)}} />
        <div className="rb-article-meta">
          <span>浏览{this.props.viewCount}</span>
          <span>喜欢{this.props.upVote}</span>
        </div>
        <div className="markdown-body" dangerouslySetInnerHTML={{__html: converter.makeHtml(this.props.presentContent)}} />
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
