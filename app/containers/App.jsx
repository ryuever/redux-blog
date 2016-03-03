import React, {Component, PropTypes} from 'react';
import Navigation from './Navigation';

import AppHeader from './AppHeader';

import classNames from 'classnames'

export default class App extends Component {
  render() {
    return (
      <div className="_rb-app">
        <div className="_rb-nav-bar">
          <Navigation />
        </div>
        <div className="_rb-header">
          <AppHeader />
        </div>
        <div className="_rb-main">
          <div className="_rb-content">
          {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
}
