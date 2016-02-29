import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import ArticleComment from './ArticleComment';

import {getArticle} from '../actions/article';

import showdown from 'showdown';

const converter = new showdown.Converter();

class Article extends Component {
  constructor(props){
    super(props);
   }

  componentDidMount(){
    const {dispatch} = this.props;
    const id = this.props.params.id
    dispatch(getArticle(id));
  }

  render(){
    return(
      <div className="articles-main col-xs-offset-1 col-xs-8">
        <section>
          <div dangerouslySetInnerHTML={{
                                        __html: converter.makeHtml(this.props.presentTitle + this.props.presentContent)
                                        }} />
          <ArticleComment
           articleId={this.props.params.id}
          />
        </section>
      </div>
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
    presentId: state.article.presentArticle.id
  }
}
export default connect(mapStateToProps)(Article)


  // <div> {this.props.presentTitle} </div> <div> {this.props.presentContent}</div>
