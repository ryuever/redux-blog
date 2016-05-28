import React, {Component, PropTypes} from 'react';
import Navigation from './Navigation';

import AppHeader from './AppHeader';

import classNames from 'classnames'

export default class App extends Component {
  render() {
    return (
      <div className="rb-app">
        <div className="rb-header">
          <AppHeader />
        </div>
        <div className="rb-main">
          <div className="rb-content">
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
