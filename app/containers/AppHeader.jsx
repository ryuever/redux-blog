import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import {
  createArticle
} from '../actions/article';

class AppHeader extends Component{
  constructor(props) {
    super(props);

    this.handlePublish = this.handlePublish.bind(this);

    this.state = {
      pageState: ''
    }
  }

  handlePublish() {
    const { dispatch } = this.props;
    dispatch(createArticle());
  }

  // componentWillUpdate(nextProps, nextState) {    // infinite loop
  componentWillReceiveProps(nextProps) {
    console.log('window : ', window);
    console.log('path : ', nextProps.routing.location);
    if (/article\/add/.test(nextProps.routing.location.pathname)) {
      console.log('set state')
        this.setState({
          pageState: 'add'
        })
    } else {
      console.log('set from log');
      this.setState({
        pageState: ''
      })
    }
  }

  componentDidMount() {
    console.log('window : ', window.location.href);
    let version ='articles'
    if (/article\/add/.test(window.location.href)) {
      version = 'add article';
    }
    console.log('article : ', version);
  }

  render(){
    let pageState = this.state.pageState;

    console.log('page state : ---------', this.state, pageState);
    let action = '';

    let title = 'Write an article';
    if (pageState === 'add') {
      title = 'Publish'
      action = (
        <button
         className="post-article"
         onClick={this.handlePublish}
         >Publish</button>
      )
    } else {
      title = 'Write an article';
      action = (
        <Link to="/article/add">
        <span className="post-article">Write an article</span>
        </Link>
      )
    }
    return(
      <div className="rb-header-container">
        <div className="rb-actions">
          {action}
          <input className="rb-search rb-action-item" placeholder="search" />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}
export default connect(mapStateToProps)(AppHeader);
