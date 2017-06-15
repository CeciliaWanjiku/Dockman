import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';


export default function sessionReducer(state = [], action) {
  switch (action.type) {
    case types.LOG_IN_SUCCESS:
      browserHistory.push('/document');
      return !!action.token;
    case types.LOG_OUT:
      browserHistory.push('/');
      return !!action.token;
    default:
      return state;
  }
}
