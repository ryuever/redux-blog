import React, {Component, PropTypes} from 'react';

import ReactTag from './ArticleTag'
import ReactTagSuggestion from './ArticleTagSuggestion'

class ArticleTagContainer extends Component{

  render(){
    return(
      <div className="rb-add-article-tags-container">
        <ReactTagSuggestion />
        <ReactTag />
      </div>
    )
  }
}


export default ArticleTagContainer
