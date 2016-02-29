import {combineReducers} from 'redux';
import {routeReducer as routing} from 'react-router-redux';

import user from './user';
import article from './article';
import comment from './comment';
import articleMeta from './articleMeta'


const rootReducer = combineReducers({
  user,
  article,
  articleMeta,
  comment,
  routing
});

export default rootReducer
