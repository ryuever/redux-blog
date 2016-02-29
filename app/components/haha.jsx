          /* <div className="article-content">
             <ArticleContentInput newContent={this.props.articleContent}
             onContentChange={this.onContentChange} />
             </div> */














import React, {Component, PropTypes} from 'react'

// import Editor from './pp';
import {Editor, EditorState} from 'draft-js';
import ReactQuill from 'react-quill';
// import {ProseMirror} from "prosemirror/dist/edit"


class ArticleContentInput extends Component{
  constructor(props){
    super(props);
    this.onContentChange = this.onContentChange.bind(this);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
  }

  onContentChange(event){
    console.log('on content change ---------');
    const {onContentChange} = this.props;
    console.log("first step on title change : ", event.target.value)
    onContentChange(event.target.value);
  }

  componentDidMount() {
    console.log("component did update --------");
    /* jQuery(function ($) {
       let pm = new ProseMirror({place: $(".content")[0]})

       // var simplemde = new SimpleMDE({ element: $(".content")[0]});
       // $('.content').markdown({autofocus:false,savable:false});
       // $('.content').wysiwyg();
       }) */
  }

  render(){
    console.log('article input -----------------------', this.state);
    const {editorState} = this.state;
    // return <Editor editorState={editorState} onChange={this.onChange} />;
    // return (<ReactQuill theme='snow' value={this.state.value} />)

    /* return (<ReactQuill>
       <ReactQuill.Toolbar key="toolbar"
       ref="toolbar"
       items={ReactQuill.Toolbar.defaultItems} />
       <div key="editor"
       ref="editor"
       className="quill-contents" />

       </ReactQuill>) */
    return()
      /* return(
         <textarea
         type="text"
         data-provide="markdown"
         className="article-form-input content"
         value={this.props.newContent}
         onChange={this.onContentChange}
         />
         ) */
  }
}

export default ArticleContentInput
