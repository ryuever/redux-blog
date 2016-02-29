import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';

function compare(a,b) {
  if (a.full_slug < b.full_slug)
    return -1;
  else if (a.full_slug > b.full_slug)
    return 1;
  else
    return 0;
}

class commentReply extends Component{

  constructor(props){

    super(props);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(){
    console.log('submit a reply');
    const {onSubmitReply, slug} = this.props;
    const reply = ReactDOM.findDOMNode(this.refs.reply).value;
    const replyName = ReactDOM.findDOMNode(this.refs.replyName).value;

    onSubmitReply(reply, replyName, slug)

  }

  render(){
    return(
      <div className="_rb-comment-reply">
        <input
         placeholder="Input your name"
         ref="replyName"/>
        <input
         placeholder="Input your comment"
         ref="reply"/>
        <button
         className="_rb-comment-reply-btn _rb-btn"
         onClick={this.onSubmit}
         >
          Submit
        </button>
      </div>
    )
  }
}

class replyBtn extends Component {
  constructor(props){
    super(props);
    this.onclick = this.onclick.bind(this);
  }

  onclick(){
    console.log('on reply click -----------');
    const {onReply, slug}  = this.props;
    console.log("click slug : ", slug);
    onReply(slug);
  }
  render(){
    return(
      <button
       className="_rb-comment-reply-btn _rb-btn"
       onClick={this.onclick}
       >
        Reply
      </button>
    )

  }

}



export default class ArticleCommentListItem extends Component{
  constructor(props){
    super(props);
    this.onReply = this.onReply.bind(this);
    this.onSubmitReply = this.onSubmitReply.bind(this);
    this.state = {
      clickReply: false
    };
  }

  onSubmitReply(reply, replyName, slug){
    const {onSubmitCommentReply, commentList} = this.props;
    const ref_comment = commentList.comments[0];
    /* console.log('onsubmitComment Reply commentlist : ', commentList, onSubmitCommentReply, ref_comment);
       console.log('comment list first one : ', ref_comment); */
    /* var parent_slug = ref_comment.slug; */
    var articleId = ref_comment.articleId
    console.log('submit reply : ', slug, articleId, reply, replyName);

    onSubmitCommentReply(reply, articleId, replyName, slug);
  }

  onReply(slug){
    // this.popup = document.createElement('input');
    console.log("click reply ");
    /* var target = document.getElementById('_rb-comment-item');
       var el = React.createElement('input');
       return ReactDOM.render(el, target); */

    this.setState({
      clickReply: true,
      slug: slug
    })
  }

  render(){
    console.log('this.onReply : ', this.onReply);
    console.log('this state in comment item : ', this.state);

    const {clickReply, slug} = this.state

    const {commentList} = this.props;
    const commentData = commentList.comments;
    var sortedData = commentData.sort(compare);
    console.log("comment data : ", commentData);
    console.log('sorted data : ', sortedData);
    var tmp = [];
    var splited_full_slug = [];
    var slug_to_data = {};
    var pp;
    sortedData.map(function(data){
      splited_full_slug = data.full_slug.split('/');
      tmp.push(splited_full_slug);
      pp = splited_full_slug[splited_full_slug.length-1];
      console.log('pp : ', pp);
      slug_to_data[pp] = data;
    });

    var comment_tree = {};

    tmp.forEach(function(item){
      item.reduce(function(node, arr){
        return node[arr] || (node[arr] = {});
      }, comment_tree);
    });

    console.log('comment_tree', comment_tree);

    var createCommentElement = function(dict, depth, self){
      var child = '';
      var mm = [];
      var commentChild=[];
      for (var key in dict) {
        var nested_child = '';
        if(Object.keys(dict[key]).length !== 0){

          depth = depth + 1;
          nested_child = createCommentElement(dict[key], depth, self);
          depth = depth - 1;
        }
        console.log('nested_child : ', nested_child);

        /* var replyBtn = React.createElement('button', {
           className: "_rb-comment-reply-btn _rb-btn"
           }, 'reply'); */

        /* var replyButton = <replyBtn
           onReply={self.onReply}
           />; */

        var replyButton = React.createElement(replyBtn,{
          onReply:self.onReply,
          slug: slug_to_data[key].slug
        });

        commentChild = [slug_to_data[key].content ,replyButton, nested_child]

        if(clickReply && slug === slug_to_data[key].slug){
          var cr = React.createElement(commentReply, {
            onSubmitReply: self.onSubmitReply,
            slug: slug_to_data[key].slug});
          commentChild.push(cr);
        }

        child = React.createElement('div', {className: '_rb-comment-'+depth}, commentChild);

        console.log("child : ", child);

        mm.push(child);
      }
      console.log("mm : ", mm);
      return mm
    }

    var depth = 0;
    self = this
    var element = createCommentElement(comment_tree, depth, self);
    console.log("element : ", element);
    return (
      <div>
        {element}
      </div>
    )



    /* if (this.state.update === 'haha'){
       return (
       <div className="_rb-comment-item"
       id="_rb-comment-item">
       <div className="rb-comment-top" >
       </div>
       <div className="_rb-comment-item-middle">
       {commentList.comments.map(
       function(comment){
       console.log('comment id ----------- : ', comment.id);
       return(
       <div className="_rb-article-comment-item" key={comment.id} >
       {comment.creatorName + ' ' + comment.content + " "+ comment.createDate}
       </div>
       )
       }
       )}
       </div>
       <div className="_rb-comment-item-footer">
       <button className="_rb-btn"
       onClick={this.onReply}
       > reply </button>
       </div>
       <input
       placeholder="Your name"
       ref="replyName"/>
       <input
       placeholder="message"
       ref="reply"/>
       <button
       className="_rb-btn"
       onClick={this.onSubmitReply}> submit </button>
       </div>
       )
       }

       return (
       <div className="_rb-comment-item"
       id="_rb-comment-item">
       <div className="rb-comment-top" >
       </div>
       <div className="_rb-comment-item-middle">
       {commentList.comments.map(
       function(comment){
       console.log('comment id ----------- : ', comment.id);
       return(
       <div className="_rb-article-comment-item" key={comment.id} >
       {comment.creatorName + ' ' + comment.content + " "+ comment.createDate}
       </div>
       )
       }
       )}
       </div>
       <div className="_rb-comment-item-footer">
       <button className="_rb-btn"
       onClick={this.onReply}
       > reply </button>
       </div>
       <div className="_rb-comment-item-reply">
       </div>
       </div>
       ) */


      /* return(
         <div className="_rb-comment-item"
         id="_rb-comment-item">
         <div className="rb-comment-top" >
         </div>
         <div className="_rb-comment-item-middle">
         {commentList.comments.map(
         function(comment){
         console.log('comment id ----------- : ', comment.id);
         return(
         <div className="_rb-article-comment-item" key={comment.id} >
         {comment.content + comment.creatorName + comment.createDate}
         </div>
         )
         }
         )}
         </div>
         <div className="_rb-comment-item-footer">
         <button className="_rb-btn"
         onClick={this.onReply}
         > reply </button>
         </div>
         <div className="_rb-comment-item-reply">
         </div>
         </div>
         ) */
  }
}
