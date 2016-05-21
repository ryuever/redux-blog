import * as types from '../constants';
import { browserHistory } from 'react-router';
import MakeRequest from '../util/MakeRequest';

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

export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());


    let request = {};
    request.method = 'POST'
    request.path = '/login';
    request.data = data;

    MakeRequest.send(request)
               .then((res) => {
                 if (res.status >= 400) {
                   dispatch(loginError());
                   throw new Error("Bad response from server");
                 }
                 return res.json();
               })
               .then((account) => {
                 return dispatch(loginSuccess(account));
               });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    let request = {};
    request.method = 'POST'
    request.path = '/signup';
    request.data = data;

    MakeRequest.send(request)
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

    let request = {};
    request.method = 'GET'
    request.path = '/logout';

    MakeRequest.send(request)
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
