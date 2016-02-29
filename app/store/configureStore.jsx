import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import {syncHistory} from 'react-router-redux'

import rootReducer from '../reducers';

export default function configureStore(initialState, history){
  let middleware = [thunk];

  const router = syncHistory(history);

  if (__DEV__){
    middleware.push(router, createLogger());
  }else{
    middleware.push(router);
  }

  const finalCreateStore = applyMiddleware(...middleware)(createStore);
  const store = finalCreateStore(rootReducer, initialState);

  if(module.hot){
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    })
  }

  return store;
}
