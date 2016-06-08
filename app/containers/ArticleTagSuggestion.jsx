import React, {Component, PropTypes} from 'react';
import {connect} from "react-redux";
import {Link} from "react-router";

class ArticleTagSuggestion extends Component{

  render(){
    const {suggestions} = this.props;

    return(
      <div className="rb-tags">
        {suggestions.map(function(item){
          return(
            <Link to="" key={item._id}>{item.name}</Link>
          )
        })}
      </div>
    )
  }

}

ArticleTagSuggestion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  suggestions: PropTypes.array.isRequired
}

function mapStateToProps(state){

  return({
    suggestions: state.tag.suggestions
  })
}

export default connect(mapStateToProps)(ArticleTagSuggestion);
