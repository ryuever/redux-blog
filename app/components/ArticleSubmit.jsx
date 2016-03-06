import React, {Component, PropTypes} from 'react'


class ArticleSubmit extends Component{

  render(){
    return(
      <div className="_rb-post-article">
        <button
         type="submit"
         onClick={this.props.onSubmit}
         className="_rb-btn"
         >Post an article</button>
      </div>
    )
  }
}

ArticleSubmit.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ArticleSubmit;
