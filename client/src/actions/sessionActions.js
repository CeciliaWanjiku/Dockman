import * as types from './actionTypes';
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
      console.log('Login error: ', err);
    });
}

// export function loginUser(credentials) {
//   return function (dispatch) {
//     return sessionApi.login(credentials).then((response) => {
//       sessionStorage.setItem('jwt', response.jwt);
//       dispatch(loginSuccess());
//     }).catch((error) => {
//       debugger;
//       throw (error);
//     });
//   };
// }
;
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem('jwt');
  return dispatch(logOut({}));
};
// export const logOutUser = ()=>  {
//   authenticate.logOut();
//   return { type: types.LOG_OUT };
