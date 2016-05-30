import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class AppHeader extends Component{

  render(){
    let title = 'Write an article';
    if (/article\/add/.test(window.location.href)) {
      title = 'Publish'
    }
    return(
      <div className="rb-header-container">
        <div className="rb-actions">
          <Link to="/article/add">
          <span className="post-article">{title}</span>
          </Link>
          <input className="rb-search rb-action-item" placeholder="search" />
        </div>
      </div>
    )
  }
}

export default AppHeader;
