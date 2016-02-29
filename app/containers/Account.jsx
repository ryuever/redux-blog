import React, {Component, PropTypes} from 'react';
import classNames from 'classnames'

import {Link} from 'react-router'

class Account extends Component {

  render(){
    let pathname = this.props.location.pathname;
    let isLogin = pathname === '/login' ? true : false;
    let isSignup = pathname === '/signup' ? true : false;

    return (
      <div className="_rb-account-control-container">

        <div className="_rb-account-control-logo">
          <h1> Vision Seeker </h1>
        </div>

        <div className="_rb-account-control-body center">
          <div className="_rb-account-control-title center">
            <span>
              <Link to="/login" className={classNames({"selected" : isLogin}, '_rb-btn')}> Login </Link>
            </span>
            <span>
              <Link to="/signup" className={classNames({"selected" : isSignup}, '_rb-btn')}> Signup </Link>
            </span>
          </div>
          {this.props.children}
        </div>

      </div>
    )
  }
}

export default Account
