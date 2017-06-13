import { combineReducers } from 'redux';
import documents from './document';
import users from './user';


const rootReducer = combineReducers({
  documents,
  users
});

export default rootReducer;
