import * as types from './actionTypes';
import { getEndpoint } from '../../utils/documentsAPI';

export function loadUsersSuccess(users) {
  return { type: types.LOAD_USER_SUCCESS, users };
}

export function loadUsers() {
  return function (dispatch) {
    getEndpoint('/api/users/')
    .end((err, res) => dispatch(loadUsersSuccess(res.body)));
  };
}
