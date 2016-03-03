import React, {Component, PropTypes} from 'react';


class AppHeader extends Component{

  render(){
    return(
      <div className="_rb-actions">
        <input className="_rb-search _rb-action-item" placeholder="search" />
        <div className="_rb-search _rb-action-item">
          <span className="glyphicon glyphicon-search _rb-action"></span>
        </div>
        <div className="_rb-tags _rb-action-item">
          <span className="glyphicon glyphicon-tags _rb-action"></span>
        </div>
      </div>
    )
  }
}

export default AppHeader;
