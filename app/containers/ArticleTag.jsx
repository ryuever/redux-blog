import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import {WithContext as ReactTags} from 'react-tag-input'

import {
  tagAddition, tagDelete, tagDrag
} from '../actions/tag';

class ArticleTag extends Component{
  constructor(props){
    super(props);

    this.handleTagAddition = this.handleTagAddition.bind(this);
    this.handleTagDelete = this.handleTagDelete.bind(this);
    this.handleTagDrag = this.handleTagDrag.bind(this);
  }

  handleTagDelete(i){
    console.log('delete tag : ', i);
    const {dispatch} = this.props;
    dispatch(tagDelete(i));
  }

  handleTagAddition(tag){
    console.log('add tag : ', tag);
    const {dispatch} = this.props;
    dispatch(tagAddition(tag));
  }

  handleTagDrag(tag, currPos, newPos){
    console.log("drag tag : ", tag, currPos, newPos);
    const {dispatch} = this.props;
    dispatch(tagDrag(tag, currPos, newPos));
  }

  render(){
    console.log('render article tag');
    var tags = this.props.newTags;
    return(
      <ReactTags
       tags={tags}
       handleAddition={this.handleTagAddition}
       handleDelete={this.handleTagDelete}
       handleDrag={this.handleTagDrag} />
    )
  }
}

ArticleTag.propTypes = {
  newTags: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps(state){
  return{
    newTags: state.tag.newArticleTag,
  }
}

export default connect(mapStateToProps)(ArticleTag)
