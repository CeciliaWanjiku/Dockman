import * as types from './actionTypes';
import { getEndpoint, postEndpoint } from '../../utils/documentsAPI';

export const loadUsersSuccess = users => ({ type: types.LOAD_USER_SUCCESS, users });

export const loadUsers = () => dispatch => getEndpoint('/api/users/').end((err, res) =>
dispatch(loadUsersSuccess(res.body)));
export const createUsersSuccess = user => ({
  type: types.CREATE_USERS_SUCCESS, user });
export const updateUsersSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS, user });
export const deleteUsersSuccess = user =>
 ({ type: types.DELETE_USER_SUCCESS, user });
export const searchUsersSuccess = users =>
({ type: types.SEARCH_USER_SUCCESS, users });


export const createUser = user => (dispatch) => {
  postEndpoint('/api/users')
    .send(user)
    .end((err, res) => dispatch(createUsersSuccess({ user: res.body })));
};
export function updateUser(user) {
  return function (dispatch) {
    putEndpoint(`/api/users/${user.id}`)
    .send(user)
    .end((err, res) => dispatch(updateUsersSuccess({ user: res.body })));
  };
}
export function deleteUser(user) {
  return function (dispatch) {
    deleteEndpoint(`/api/user/${doc.id}`)
    .send(user)
    .end((err, res) => dispatch(deleteUsersSuccess({ user: res.body })));
  };
}
export function searchUser(searchValue) {
  searchValue = encodeURIComponent(searchValue);
  return function (dispatch) {
    getEndpoint(`/api/search/user?q=${searchValue}`)
    .end((err, res) => dispatch(searchUsersSuccess(res.body)));
  };
}

