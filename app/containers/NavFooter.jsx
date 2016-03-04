import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from "react-router";

class NavFooter extends Component{

  RenderAuth(){
    const {authenticated} = this.props;

    var classname = classNames({
      "glyphicon": true,
      "glyphicon-log-in": !authenticated,
      "glyphicon-log-out": authenticated,
      'authenticated': true
    });

    if (authenticated){
      return(
        <Link to="/logout">
        <span className={classname}></span>
        </Link>
      )
    }else{
      return(
        <Link to="/login">
        <span className={classname}>
        </span>
        </Link>
      )
    }
  }

  render(){
    return(
      <dir className="_rb-system-action">
        <span className="glyphicon glyphicon-list" />
        {this.RenderAuth()}
        <span className="glyphicon glyphicon-cog" />
      </dir>
    )
  }
}

export default NavFooter;
