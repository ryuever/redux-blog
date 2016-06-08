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

    const {authenticated} = this.props.user;
    if (authenticated){
      return (
        <h1> Signup successful</h1>
      )
    }

    return(
      <fieldset>
        <input className="rb-form-input center"
         type="email"
         ref="email"
         placeholder="email" />
        <input className="rb-form-input center"
         type="password"
         ref="password"
         placeholder="password" />
        <button
         onClick={this._onSignupSubmit} className="center rb-btn">Signup</button>
      </fieldset>
    )
  }
}

Signup.propTypes = {
  dispatch: PropTypes.func
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Signup)
