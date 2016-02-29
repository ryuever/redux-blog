import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import configureStore from './store/configureStore'

import routes from './routes'

const initialState = {}
// const initialState = window.__INITIAL_STATE__

const store = configureStore(initialState, browserHistory);
console.log("store in client : ", store);

// const store={};
render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>
  , document.getElementById('app')
);
