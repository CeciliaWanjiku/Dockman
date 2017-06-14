import * as types from '../actions/actionTypes';
import { browserHistory } from 'react-router';

export default function sessionReducer(state = [], action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      browserHistory.push('/users');
      return !!sessionStorage.jwt;
    case types.LOG_OUT:
      browserHistory.push('/');
      return !!sessionStorage.jwt;
    default:
      return state;
  }
}
