import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import {signUp} from '../actions/user';

class Signup extends Component {
  constructor(props) {
    super(props);
    this._onSignupSubmit = this._onSignupSubmit.bind(this);
  }

  _onSignupSubmit(){
    console.log("on signup submit");
    const {dispatch} = this.props;
    const email = ReactDOM.findDOMNode(this.refs.email).value;
    const password = ReactDOM.findDOMNode(this.refs.password).value;
    dispatch(signUp({
      email: email,
      password: password
    }))
  }

  render(){
    return(
      <fieldset>
        <input className="_rb-form-input center"
         type="email"
         ref="email"
         placeholder="email" />
        <input className="_rb-form-input center"
         type="password"
         ref="password"
         placeholder="password" />
        <button
         onClick={this._onSignupSubmit} className="center _rb-btn">Signup</button>
      </fieldset>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func
}

export default connect()(Signup);
