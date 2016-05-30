import React, {Component, PropTypes} from 'react';
import {Route, IndexRoute} from 'react-router';

import App from './containers/App';
import About from './containers/About';

import Account from './containers/Account';
import Signup from './containers/Signup';
import Login from './containers/Login';
import Home from './containers/Home';

import Logout from './containers/Logout';

import ArticleList from './containers/Articles';
import Article from './containers/Article';
import AddArticle from './containers/AddArticle';
import ArticleLayout from './containers/ArticleLayout';

export default (store) => {

  return (
    <Route path="/">
      <IndexRoute component={Home}/>
      <Route component={Account}>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Route>
      <Route component={App}>
        <Route path="logout" component={Logout} />
        <Route path="about" component={About} />
        <Route path="articles">
          <IndexRoute component={ArticleList} />
        </Route>
        <Route path="article" component={ArticleLayout}>
          <Route path="add" component={AddArticle} />
          <Route path=":id" component={Article} />
        </Route>
      </Route>
    </Route>
  )
}
