import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as types from '../../client/src/actions/actionTypes';
import * as sessionActions from '../../client/src/actions/sessionActions';


const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('sync login actions', (done) => {
  it('login', () => {
    const credentials = { email: 'muchai@muchai.com', password: 'muchai' };
    nock('http://localhost:8090/')
    .post('/api/users/login')
    .reply(201, { body: { credentials: { email: 'muchai@muchai.com', password: 'muchai' } } });
    const expectedAction = [{ type: types.LOG_IN_SUCCESS, body: { token: 'hgfkjh.hgfg' } }];
    const store = mockStore({ loginUser: [] }, expectedAction);
    store.dispatch(sessionActions.loginUser(credentials)).then(() => {
      const action = store.getAction();
      expect(action[0].type).toEqual(types.LOG_IN_SUCCESS);
      done();
    });
  });
  it('logout', () => {
    const expectedAction = [{ type: types.USER_LOGOUT_SUCCESS, body: { loginUser: [] } }];
    const store = mockStore({ loginUser: [] }, expectedAction);
    store.dispatch(sessionActions.logoutUser());
  });
});
