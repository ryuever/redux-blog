import React, {Component, PropTypes} from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import classNames from 'classnames'

export default class Navigation extends Component {
  render(){
    return (
      <div>
        <Link to="/about" className="btn"> About </Link>
        <Link to="/login" className="btn"> Login </Link>
        <Link to="/signup" className="btn"> Signup </Link>
        <Link to="/logout" className="btn"> Logout </Link>
        <Link to="/articles" className="btn"> Articles </Link>
        <Link to="/article/add" className="btn"> New</Link>
      </div>
    )
  }
}
