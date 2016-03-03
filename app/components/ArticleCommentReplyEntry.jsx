import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';


class ArticleCommentReplyEntry extends Component{
  constructor(props){
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount(){
    const reply = ReactDOM.findDOMNode(this.refs.reply);
    const replyName = ReactDOM.findDOMNode(this.refs.replyName);
    reply.value='';
    replyName.value='';
  }

  handleBlur(){
    const {handleReplyBlur} = this.props;
    handleReplyBlur();
  }

  onSubmit(){
    const {handleReplySubmit, slug} = this.props;
    const reply = ReactDOM.findDOMNode(this.refs.reply).value;
    const replyName = ReactDOM.findDOMNode(this.refs.replyName).value;

    handleReplySubmit(reply, replyName, slug)
  }

  render(){
    return(
      <div className="_rb-comment-reply" >
        <textarea
         placeholder="Input your comment"
         ref="reply"/>
        <div >
          <input
           placeholder="Input your name"
           ref="replyName"/>
        </div>
        <div>
          <button
           className="_rb-comment-reply-btn _rb-btn"
           onClick={this.onSubmit}
           >
            Submit
          </button>
        </div>
      </div>
    )
  }
}

export default ArticleCommentReplyEntry
