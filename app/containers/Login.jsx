import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import classNames from 'classnames'

import {manualLogin} from '../actions/user';

const ENTER_KEY_CODE = 13;

class Login extends Component {
  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  _onLoginSubmit(){
    const {dispatch} = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(manualLogin({
      email: email,
      password: password
    }))
  }

  onKeyDown(event){
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    if (email.trim().length <= 0 ) return;
    if (event.keyCode === ENTER_KEY_CODE){
      this._onLoginSubmit();
    }
  }

  render(){
    const {authenticated, isWaiting} = this.props.user;
    if (authenticated){
      return (
        <h1> You are logged </h1>
      )
    }

    return(
        <fieldset>
          <input className="_rb-form-input center"
           type="email"
           ref="email"
           placeholder="email" />
          <input className="_rb-form-input center"
           onKeyDown={this.onKeyDown}
           type="password"
           ref="password"
           placeholder="password" />
          <button
           onClick={this._onLoginSubmit}
           className="center _rb-btn">Login</button>
        </fieldset>
    )
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
