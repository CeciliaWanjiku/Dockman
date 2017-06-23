import toastr from 'toastr';
import * as types from './actionTypes';
import { getEndpoint, postEndpoint, putEndpoint, deleteEndpoint } from '../../utils/documentsAPI';

export const loadUsersSuccess = users => ({ type: types.LOAD_USER_SUCCESS, users });

export const loadUsers = () => dispatch => getEndpoint('/api/users/')
  .set('access-token', localStorage.getItem('jwt'))
  .end((err, res) => {
    if (!err) {
      dispatch(loadUsersSuccess(res.body));
    } else {
      toastr.error('Unauthorized!');
      // alert('');
    }
  });
export const createUsersSuccess = user => ({
  type: types.CREATE_USER_SUCCESS, user });
export const updateUsersSuccess = user => ({
  type: types.UPDATE_USER_SUCCESS, user });
export const deleteUsersSuccess = user =>
 ({ type: types.DELETE_USER_SUCCESS, user });
export const searchUsersSuccess = users =>
({ type: types.SEARCH_USER_SUCCESS, users });


export const createUser = user => (dispatch) => {
  postEndpoint('/api/users')
  .set('access-token', localStorage.getItem('jwt'))
    .send(user)
    .end((err, res) => dispatch(createUsersSuccess({ user: res.body })));
};

export const updateUser = user => (dispatch) => {
  putEndpoint(`/api/users/${user.id}`)
    .set('access-token', localStorage.getItem('jwt'))
    .send(user)
    .end((err, res) => dispatch(updateUsersSuccess({ user: res.body })));
};

export const deleteUser = user => (dispatch) => {
  deleteEndpoint(`/api/user/${user.id}`)
  .set('access-token', localStorage.getItem('jwt'))
    .send(user)
    .end((err, res) => dispatch(deleteUsersSuccess({ user: res.body })));
};

export const searchUser = (searchValue) => {
  searchValue = encodeURIComponent(searchValue);
  return (dispatch) => {
    getEndpoint(`/api/search/user?q=${searchValue}`)
    .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => dispatch(searchUsersSuccess(res.body)));
  };
};

