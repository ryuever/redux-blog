import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

class AppHeader extends Component{

  render(){
    return(
      <div className="rb-header-container">
        <div className="rb-actions">
          <Link to="/article/add">
          <span className="post-article">write an article</span>
          </Link>
          <input className="rb-search rb-action-item" placeholder="search" />
        </div>
      </div>
    )
  }
}

export default AppHeader;
