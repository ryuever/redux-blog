import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
// import 'draft-js/dist/Draft.css';

import RichEditor from '../components/ArticleContentInput';
import ArticleTitleInput from '../components/ArticleTitleInput';
import ArticleSubmit from '../components/ArticleSubmit';

import {
  createArticle, titleTyping, contentTyping
} from '../actions/article'

class AddArticle extends Component {
  constructor(props){
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.onContentChange = this.onContentChange.bind(this);
    this.onEntrySave = this.onEntrySave.bind(this);
  }

  onTitleChange(text){
    console.log("this props in AddArticle : ", this.props, text)
    const {dispatch} = this.props;
    dispatch(titleTyping(text));
  }

  onContentChange(text){
    const {dispatch} = this.props;
    dispatch(contentTyping(text));
  }

  onEntrySave(text){
    console.log("save entry from add article");
    const {dispatch} = this.props
    dispatch(createArticle());
  }

  render(){
    console.log("this props in addarticle render  :  ", this.props)
    return(
      <div className="add-article-main col-xs-offset-1 col-xs-8">
        <div className="add-article-page-title">
          create a new article
        </div>
        <div className="article-scratch-body center">

          <div className="article-title">
            <ArticleTitleInput newTitle={this.props.articleTitle}
             onTitleChange={this.onTitleChange} />
          </div>
          <RichEditor
           onContentChange={this.onContentChange}/>
          <ArticleSubmit
           onSubmit={this.onEntrySave}/>
        </div>
      </div>
    )
  }
}

AddArticle.propTypes = {
  /* articleTitle: PropTypes.string.isRequired,
     articleContent: PropTypes.string.isRequired, */
  articleTitle: PropTypes.string,
  articleContent: PropTypes.string,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  console.log("mapping state to props from add article=================");
  console.log('state : ', state)
    return {
      articleTitle: state.article.newArticle.articleTitle,
      articleContent: state.article.newArticle.articleContent
    }
}

export default connect(mapStateToProps)(AddArticle)
