import * as types from '../constants';
import { browserHistory } from 'react-router';

// Log In Action Creators
function beginLogin() {
  return { type: types.MANUAL_LOGIN_USER };
}

function loginSuccess(account) {
  return {
    type: types.LOGIN_SUCCESS_USER,
    account: account
  };
}

function loginError() {
  return { type: types.LOGIN_ERROR_USER };
}

// Sign Up Action Creators
function signUpError() {
  return { type: types.SIGNUP_ERROR_USER };
}

function beginSignUp() {
  return { type: types.SIGNUP_USER };
}

function signUpSuccess(account) {
  return {
    type: types.SIGNUP_SUCCESS_USER,
    account: account
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: types.LOGOUT_USER};
}

function logoutSuccess() {
  return { type: types.LOGOUT_SUCCESS_USER};
}

function logoutError() {
  return { type: types.LOGOUT_ERROR_USER};
}

// var MakeRequest = require('Util/MakeRequest');
import MakeRequest from '../util/MakeRequest';

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    MakeRequest.post({
      url: '/api/login',
      data: {data: data}
    })
      .then((res) => {
        if (res.status >= 400) {
          dispatch(loginError());
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((account) => {
        console.log('account : ', account);
        return dispatch(loginSuccess(account));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    MakeRequest.post({
      url: "/api/signup",
      data: {data: data}
    })
      .then((res) => {
        if (res.status >= 400) {
          dispatch(signUpError());
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((account) => {
        dispatch(signUpSuccess(account));
      });
  };
}

export function logout(){
  return (dispatch, getState) => {
    MakeRequest.get({
      url: '/api/logout'
    })
      .then((res) => {
        if (res.status >= 400) {
          dispatch(logoutError());
          throw new Error("Bad response from server");
        }
        return res.json();
      })
      .then((account) => {
        dispatch(logoutSuccess());
        browserHistory.push('/login');
      });
  };
}
