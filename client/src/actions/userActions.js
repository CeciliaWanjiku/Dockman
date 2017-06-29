import toastr from 'toastr';
import * as types from './actionTypes';
import { getEndpoint, postEndpoint, putEndpoint, deleteEndpoint } from '../../utils/documentsAPI';

export const loadUsersSuccess = users => ({ type: types.LOAD_USER_SUCCESS, users });

export const loadUsers = (limit = 10, offset = 0) => (dispatch) => {
  getEndpoint(`/api/users/?limit=${limit}&offset=${offset}`)
  .set('access-token', localStorage.getItem('jwt'))
  .end((err, res) => {
    if (!err) {
      res.body.data.count = res.body.data;
      dispatch(loadUsersSuccess(res.body.data));
    } else {
      toastr.error('Unauthorized!');
      // alert('');
    }
  });
};

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
    .end((err, res) => {
      if (!err) {
        return dispatch(createUsersSuccess({ user: res.body }));
      }
      console.log('............', err);
      toastr.error('error', err);
    });
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

// export const searchUser = (searchValue) => {
//   searchValue = encodeURIComponent(searchValue);
//   return (dispatch) => {
//     getEndpoint(`/api/search/users?q=${searchValue}`)
//     .set('access-token', localStorage.getItem('jwt'))
//     .end((err, res) => dispatch(searchUsersSuccess(res.body)));
//   };
// };
export const searchUser = (searchValue) => {
  searchValue = encodeURIComponent(searchValue);
  return (dispatch) => {
    getEndpoint(`/api/search/users?q=${searchValue}`)
    .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => {
      if (res.body.length < 1) {
        toastr.error('User not found');
        return dispatch(searchUsersSuccess(res.body));
      }
      return dispatch(searchUsersSuccess(res.body));
    });
  };
};

