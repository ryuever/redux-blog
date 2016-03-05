// Including es6-promise so isomorphic fetch will work
import 'es6-promise';
// import fetch from 'isomorphic-fetch';

import * as types from '../constants';
import { browserHistory } from 'react-router'


// Note this can be extracted out later
/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
/* function makeUserRequest(method, data, api='/login') {
   return fetch(api, {
   method: method,
   credentials: 'same-origin',
   headers: {
   'Accept': 'application/json',
   'Content-Type': 'application/json'
   },
   body: JSON.stringify(data)
   });
   } */

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
  console.log("login error -------------");
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
  console.log('manual login data : ', data);
  return dispatch => {
    dispatch(beginLogin());

    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: {data: data}
    })
     .done((account) => {
       return dispatch(loginSuccess(account));
     })
     .fail((jqXHR) => {
       return dispatch(loginError())
     })
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());

    $.ajax({
      type: "POST",
      url: "/api/signup",
      data: {data: data}
    })
     .done((account)=>{
       return dispatch(signUpSuccess(account));
     })
     .fail(()=>{
       return dispatch(signUpError());
     })
  };
}

export function logout(){
  return (dispatch, getState) => {
    $.ajax({
      type: "GET",
      url: '/api/logout'
    })
     .done(function(){
       dispatch(logoutSuccess());
       browserHistory.push('/login')
     })
     .fail(function(){
       dispatch(logoutError());
     })
  }
}
