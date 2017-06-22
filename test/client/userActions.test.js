import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as userActions from '../../client/src/actions/userActions';
import * as types from '../../client/src/actions/actionTypes';


// Test a sync action
describe('User Actions', () => {
  describe('createUserSuccess', () => {
    it('should create a CREATE_USER_SUCCESS action', () => {
      // arrange
      const user = { id: '60', name: 'Test Name', email: 'email@email.com' };
      const expectedAction = {
        type: types.CREATE_USER_SUCCESS,
        user
      };

      // act
      const action = userActions.createUsersSuccess(user);

      // assert
      expect(action).toEqual(expectedAction);
    });
  });
});

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('should create BEGIN_AJAX_CALL and LOAD_USERS_SUCCESS when loading users', (done) => {
    nock('http://localhost:8090/')
     .get('/api/users')
    .reply(200, { body: { user: [{ id: 2, name: 'User test', email: 'user@user.com' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_USERS_SUCCESS, body: { USERS: [{ id: '60', name: 'Test Name', email: 'email@email.com' }] } }
    ];

    const store = mockStore({ users: [] }, expectedActions, done());
    store.dispatch(userActions.loadUsers()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_USERS_SUCCESS);
      done();
    });
  });
});
