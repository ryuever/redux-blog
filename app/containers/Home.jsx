import React, { Component, PropTypes } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router';

import FlexReactModal from 'flex-react-modal';
import { manualLogin } from '../actions/user';

class Home extends Component{

  constructor(props) {
    super(props);
    this.onLoginClick = this.onLoginClick.bind(this);
    this.onRegisterClick = this.onRegisterClick.bind(this);
    this.handleSuccess = this.handleSuccess.bind(this);

    this.config = [
      {
        header: '登陆',
        content: [
          {
            component: 'FlexInput',
            placeholder: '请输入姓名',
            refer: 'name'
          },
          {
            component: 'FlexInput',
            placeholder: '请输入密码',
            type: 'password',
            refer: 'login_password'
          },
          {
            component: 'FlexButton',
            content: '确认',
            handleClick: this.onLoginClick
          }
        ]
      },
      {
        header: '注册',
        content: [
          {
            component: 'FlexInput',
            placeholder: '请输入姓名',
            refer: 'register_name'
          },
          {
            component: 'FlexInput',
            placeholder: '请输入密码',
            type: 'password',
            refer: 'register_password'
          },
          {
            component: 'FlexInput',
            placeholder: '请再次输入密码',
            type: 'password',
            refer: 'register_confirmed_password'
          },
          {
            component: 'FlexButton',
            content: '确认',
            handleClick: this.onRegisterClick
          }
        ]
      }
    ]
  }

  onLoginClick(data) {
    const { dispatch } = this.props;

    dispatch(manualLogin({
      email: data.name,
      password: data.login_password
    }))
  }

  onRegisterClick(data) {
    console.log('click register : ', data);
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
      <FlexReactModal
       config={this.config}
      />
    )
  }
}

Home.contextTypes = {
  router: PropTypes.object.isRequired
}

Home.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

function mapStateToProps(state){
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(Home)
