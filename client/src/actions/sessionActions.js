import * as types from './actionTypes';
import toastr from 'toastr';
import { postEndpoint } from '../../utils/documentsAPI';
import authenticate from '../authenticate/authenticate';


export const loginSuccess = res => ({ type: types.LOG_IN_SUCCESS, token: res.token });
export const logOut = res => ({ type: types.LOG_OUT, token: res.token });

export const loginUser = credentials => (dispatch) => {
  postEndpoint('/api/users/login')
    .send(credentials)
    .end((err, res) => {
      if (!err) {
        localStorage.setItem('jwt', res.body.token);
        localStorage.setItem('user_id', res.body.id);
        return dispatch(loginSuccess({ token: res.body.token }));
      }
      toastr.error(err);
      console.log('Login error: ', err);
    });
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt');
  return dispatch(logOut({}));
};
