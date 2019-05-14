import { combineReducers } from 'redux';
import auth from './auth';
import post from './post';

const reducer = combineReducers({
  auth,
  post,
});

export default reducer;
