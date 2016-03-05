import React, {Component, PropTypes} from 'react';
import classNames from 'classnames';
import {Link} from "react-router";
import { browserHistory } from 'react-router'

class NavFooter extends Component{

  constructor(props){
    super(props);
    this.onLogoutClick = this.onLogoutClick.bind(this);
  }

  onLogoutClick(){
    const {handleLogout} = this.props;
    console.log("handle log out : ", handleLogout);
    handleLogout();
  }

  RenderAuth(){
    const {authenticated} = this.props;

    var classname = classNames({
      "glyphicon": true,
      "glyphicon-log-in": !authenticated,
      "glyphicon-log-out": authenticated,
      'authenticated': true
    });

    var toLink = authenticated ? '/logout' : '/login'

    if (authenticated){

      return(
        <span
         className={classname}
         onClick={this.onLogoutClick}
         >登出
        </span>
      )
    }else{
      return(
        <Link to="/login">
        <span className={classname}>登录</span>
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
