import * as types from './actionTypes';
import { postEndpoint } from '../../utils/documentsAPI';
import authenticate from '../authenticate/authenticate';


export const loginSuccess = () => ({ type: types.LOG_IN_SUCCESS });
export const loginUser = credentials => (dispatch) => {
  postEndpoint('/api/users/login')
    .send(credentials)
    .end((err, res) => dispatch(loginSuccess({ response: res.body })));
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
// export function logOutUser() {
//   authenticate.logOut();
//   return { type: types.LOG_OUT };
