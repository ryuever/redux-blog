import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames'

import ArticleCommentListItemFooter from './ArticleCommentListItemFooter';
import ArticleCommentReplyEntry from './ArticleCommentReplyEntry';

function compare(a,b) {
  if (a.full_slug < b.full_slug)
    return -1;
  else if (a.full_slug > b.full_slug)
    return 1;
  else
    return 0;
}

export default class ArticleCommentListItem extends Component{
  constructor(props){
    super(props);

    this.handleClickReply  = this.handleClickReply.bind(this);
    this.handleReplySubmit = this.handleReplySubmit.bind(this);
    this.handleReplyBlur   = this.handleReplyBlur.bind(this);

    this.state = {
      clickReply: false
    };
  }

  handleReplySubmit(reply, replyName, slug){
    const {onSubmitCommentReply, commentList} = this.props;
    const ref_comment = commentList.comments[0];

    var articleId = ref_comment.articleId

    this.setState({
      clickReply: false
    });

    onSubmitCommentReply(reply, articleId, replyName, slug);
  }

  handleReplyBlur(){
    this.setState({
      clickReply: false
    })
  }

  handleClickReply(slug){
    this.setState({
      clickReply: !this.state.clickReply,
      slug: slug
    })
  }

  render(){

    const {clickReply, slug} = this.state
    const {commentList} = this.props;
    const commentData = commentList.comments;
    var sortedData = commentData.sort(compare);

    var tmp = [];
    var splited_full_slug = [];
    var slug_to_data = {};
    var pp;
    sortedData.map(function(data){
      splited_full_slug = data.full_slug.split('/');
      tmp.push(splited_full_slug);
      pp = splited_full_slug[splited_full_slug.length-1];
      slug_to_data[pp] = data;
    });

    var comment_tree = {};

    tmp.forEach(function(item){
      item.reduce(function(node, arr){
        return node[arr] || (node[arr] = {});
      }, comment_tree);
    });

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

        var commentFooter = React.createElement(ArticleCommentListItemFooter,{
          handleClickReply:self.handleClickReply,
          slug: slug_to_data[key].slug
        });

        commentChild = [slug_to_data[key].content ,commentFooter, nested_child]

        if(clickReply && slug === slug_to_data[key].slug){
          var cr = React.createElement(ArticleCommentReplyEntry, {
            handleReplySubmit: self.handleReplySubmit,
            handleReplyBlur: self.handleReplyBlur,
            slug: slug_to_data[key].slug});
          commentChild = [slug_to_data[key].content ,commentFooter, cr, nested_child]
        }

        console.log("slug_to_data[key] : ", slug_to_data[key]);

        child = React.createElement('div', {
          className: classNames('_rb-comment-'+depth, '_rb-comment-item'),
          key: slug_to_data[key]._id    // not work for 'should have a unique "key" prop.'
        }, commentChild);

        mm.push(child);
      }
      return mm
    }

    var depth = 0;
    self = this
    var element = createCommentElement(comment_tree, depth, self);
    return (
      <div>
        {element}
      </div>
    )
  }
}
