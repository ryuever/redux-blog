import React, {Component, PropTypes} from 'react';
import Navigation from './Navigation'

import classNames from 'classnames'

export default class App extends Component {
  render() {
    return (
      <section className="row">
        <div className="col-xs-1">
          <Navigation />
        </div>
        <div className="col-xs-10">
          {this.props.children}
        </div>
      </section>
    );
  }
}

App.propTypes = {
  children: PropTypes.object
}
