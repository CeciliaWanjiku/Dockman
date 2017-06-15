import { combineReducers } from 'redux';
import documents from './document';
import users from './user';
import session from './sessionReducer';


const rootReducer = combineReducers({
  documents,
  users,
  session,
});

export default rootReducer;
