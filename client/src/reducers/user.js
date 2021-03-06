import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';

export default function user(state = [], action) {
  switch (action.type) {
    case types.LOAD_USER_SUCCESS:
      console.log('REDUCER RESULT:', action);
      action.users.count = action.count;
      return action.users;
    case types.CREATE_USER_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.user)
      ];
    case types.UPDATE_USER_SUCCESS:
      console.log('STATE BEFORE UPDATE:', state);
      return [
        ...state.filter(newUser => newUser.id !== action.user.id),
        Object.assign({}, action.user)
      ];
    case types.DELETE_USER_SUCCESS: {
      const newState = Object.assign([], state);
      const indexOfUserToDelete = state.findIndex(newUser => newUser.id === action.user.id);
      newState.splice(indexOfUserToDelete, 1);
      browserHistory.push('/users');
      return newState;
    }
    case types.SEARCH_USER_SUCCESS:
      return action.users;
    default:
      return state;
  }
}
