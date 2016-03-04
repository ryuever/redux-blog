import React, {Component, PropTypes} from 'react'

class ArticleTitleInput extends Component{
  constructor(props){
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this)
  }

  onTitleChange(event){
    const {onTitleChange} = this.props;
    // console.log("first step on title change : ", event.target.value);
    // const titleHTML = '<h1>'+event.target.value+'</h1>';
    onTitleChange(event.target.value);
  }

  render(){
    return(
      <input
       className="_rb-article-title-input"
       type="text"
       value={this.props.newTitle}
       onChange={this.onTitleChange}
       />
    )
  }
}

export default ArticleTitleInput
