import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/actions/actionTypes';
import * as sessionActions from '../../client/src/actions/sessionActions';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('sync login actions', () => {
  it('login', () => {
    const credentials = { email: 'muchai@muchai.com', password: 'muchai' };
    const store = mockStore(credentials);
    const expectedAction = { type: types.LOG_IN_SUCCESS, credentials };
    const action = sessionActions.loginSuccess(credentials);
    store.dispatch(action);
    expect(store.getState()).toEqual(credentials);
  });
});
  // it('logout', () => {
  //   const expectedAction = [{ type: types.USER_LOGOUT_SUCCESS, body: { loginUser: [] } }];
  //   const store = mockStore({ loginUser: [] }, expectedAction);
  //   store.dispatch(loginAction.logoutUser());
  // });

