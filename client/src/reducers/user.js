import * as types from '../actions/actionTypes';
export default function user(state = [], actions) {
  switch (actions.type) {
    case types.LOAD_USER_SUCCESS:
      return actions.users;
    default:
      return state;
  }
}
