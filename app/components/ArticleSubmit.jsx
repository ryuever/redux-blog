import React, {Component, PropTypes} from 'react'


class ArticleSubmit extends Component{

  render(){
    console.log("render article submit")
    console.log("this props from Article submit", this.props);
    return(
      <div>
        <button
         className="_rb-btn"
         type="cancel"> Cancel </button>
        <span>   </span>
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
