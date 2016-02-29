/*
import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import ArticleTextInput from 'components/ArticleTextInput'
import ArticleTitleInput from 'components/ArticleTitleInput'

class ArticleInput extends Component {
  constructor(props){
    super(props);
  }

  onEntryChange(text){
    const {dispatch} = this.props
    dispatch(typing(text));
  }

  onEntrySave(text){
    const {dispatch} = this.props
    dispatch(createArticle(text));
  }

  render(){
    return(
      <div className="article">
        <ArticleTitleInput title={this.props.newTitle}
         onEntryChange={this.onEntryChange} />
        <ArticleTextInput articleContent={this.props.newArticleConent}
         onEntryChange={this.onEntryChange} />
      </div>
    )
  }
}

ArticleInput.propTypes = {
  articleTitle: PropTypes.string.isRequired,
  articleContent: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return {
    articleTitle: state.articleInput.articleTitle,
    articleContent: state.articleInput.articleContent
  }
}

export default connect(mapStateToProps)(ArticleInput)
*/
