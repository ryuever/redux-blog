import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {getArticles} from '../actions/article';

import ArticleListItem from '../components/ArticleListItem';

class Articles extends Component{
  componentDidMount(){
    const {dispatch} = this.props;
    dispatch(getArticles());
  }

  componentWillReceiveProps(){


  }

  render(){
    const {articles} = this.props
    return(
      <div className="_rb-articles-main">

        <section className="_rb-article-list">
          {articles.map(function(article){
            return <ArticleListItem
            key={article._id}
            id={article._id}
            articleTags ={article.tags}
            articleCreateDate={article.createDate}
            articleTitle={article.title}
            articleContent={article.content}/>})}
        </section>
        {this.props.children}
      </div>
    )
  }
}

Articles.propTypes = {
  dispatch: PropTypes.func.isRequired,
  articles: PropTypes.array.isRequired
}

function mapStateToProps(state){
  return{
    articles: state.article.articles
  }
}

export default connect(mapStateToProps)(Articles)
