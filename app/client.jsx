import React from 'react'
import {render} from 'react-dom'
import {Provider} from 'react-redux'
import {Router, browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux';
import createRoutes from './routes';
import configureStore from './store/configureStore'

const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const routes = createRoutes(store);

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {routes}
    </Router>
  </Provider>, document.getElementById('app'));
