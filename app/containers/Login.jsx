import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import classNames from 'classnames'

import {manualLogin} from '../actions/user';
// require('flex-react-modal/dist/style.css');

const ENTER_KEY_CODE = 13;

class Login extends Component {
  constructor(props) {
    super(props);
    this._onLoginSubmit = this._onLoginSubmit.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);
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

  handleSuccess() {
    let router = this.context.router;

    router.replace({
      pathname: "/articles"
    })
  }

  render(){
    const {authenticated, isWaiting} = this.props.user;
    if (authenticated){
      this.handleSuccess();
      return null;
    }

    return(
        <fieldset>
          <input className="rb-form-input center"
           type="email"
           ref="email"
           placeholder="email" />
          <input className="rb-form-input center"
           onKeyDown={this.onKeyDown}
           type="password"
           ref="password"
           placeholder="password" />
          <button
           onClick={this._onLoginSubmit}
           className="center rb-btn">Login</button>
        </fieldset>
    )
  }
}

Login.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

Login.contextTypes = {
    router: PropTypes.func.isRequired
};

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Login)
