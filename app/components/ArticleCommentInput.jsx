import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

export default class ArticleCommentInput extends Component {
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){
    const {onCommentSubmit} = this.props;
    const content = ReactDOM.findDOMNode(this.refs.comment).value;
    const creatorName = ReactDOM.findDOMNode(this.refs.creatorName).value;
    onCommentSubmit(content, creatorName);
    ReactDOM.findDOMNode(this.refs.comment).value = '';
    ReactDOM.findDOMNode(this.refs.creatorName).value = '';
  }

  render(){
      return(
        <fieldset className="rb-comment-input-entry">
          <input className="rb-form-input"
           ref="creatorName"
           placeholder="your name" />
          <textarea
           className="rb-form-textarea"
           ref="comment"/>
          <button
           className="rb-btn form"
           type="submit"
           onClick={this.onSubmit}> Submit a comment</button>
        </fieldset>
    )
  }
}

ArticleCommentInput.propTypes = {
  onCommentSubmit: PropTypes.func.isRequired
}
