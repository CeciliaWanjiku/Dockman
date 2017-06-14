import * as types from './actionTypes';
import { getEndpoint } from '../../utils/documentsAPI';

export const loadUsersSuccess = users => ({ type: types.LOAD_USER_SUCCESS, users });

export const loadUsers = () => dispatch => getEndpoint('/api/users/').end((err, res) => dispatch(loadUsersSuccess(res.body)));

