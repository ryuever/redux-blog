import {combineReducers} from 'redux';
import user from './user';
import article from './article';
import comment from './comment';
import {routeReducer as routing} from 'react-router-redux';

const rootReducer = combineReducers({
  user,
  article,
  comment,
  routing
});

export default rootReducer
