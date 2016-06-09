import React, {Component, PropTypes} from 'react'


class ArticleSubmit extends Component{

  render(){
    return(
      <div className="rb-post-article">
        <button
         type="submit"
         onClick={this.props.onSubmit}
         className="rb-btn"
         >Post an article</button>
      </div>
    )
  }
}

ArticleSubmit.propTypes = {
  onSubmit: PropTypes.func.isRequired
}

export default ArticleSubmit;
