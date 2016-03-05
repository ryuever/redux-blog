import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
// import 'draft-js/dist/Draft.css';

import RichEditor from '../components/ArticleContentInput';
import ArticleTitleInput from '../components/ArticleTitleInput';
import ArticleSubmit from '../components/ArticleSubmit';

import ArticleTagContainer from './ArticleTagContainer'

import { browserHistory } from 'react-router'

import {
  createArticle, titleTyping, contentTyping
} from '../actions/article';

import {createArticleMeta} from '../actions/articleMeta'

class AddArticle extends Component {
  constructor(props){
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);

    const {authenticated} = this.props
    if (!authenticated)
       browserHistory.push('/login')
  }

  onTitleChange(text){
    const {dispatch} = this.props;
    dispatch(titleTyping(text));
  }

  onContentChange(text){
    const {dispatch} = this.props;
    dispatch(contentTyping(text));
  }

  onEntrySave(text){
    const {dispatch} = this.props
    dispatch(createArticle());
  }

  render(){
    console.log("render add article ---------");

    return(
      <div className="_rb-add-article">
        <div className="article-title">
          <ArticleTitleInput newTitle={this.props.articleTitle}
           onTitleChange={this.onTitleChange} />
        </div>
        <RichEditor
         onContentChange={this.onContentChange}/>
        <ArticleSubmit
         onSubmit={this.onEntrySave}/>
        <ArticleTagContainer />
      </div>
    )
  }
}

AddArticle.propTypes = {
  /* articleTitle: PropTypes.string.isRequired,
     articleContent: PropTypes.string.isRequired, */
  articleTitle: PropTypes.string,
  articleContent: PropTypes.string,
  authenticated: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  console.log("map state to props in add article", state, state.tag.newArticleTag);
  return {
    articleTitle: state.article.newArticle.articleTitle,
    articleContent: state.article.newArticle.articleContent,
    authenticated: state.user.authenticated

  }
}

export default connect(mapStateToProps)(AddArticle)
