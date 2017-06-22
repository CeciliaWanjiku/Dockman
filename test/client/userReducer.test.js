import expect from 'expect';
import user from '../../client/src/reducers/user';
import * as actions from '../../client/src/actions/userActions';

describe('users Reducer', () => {
  it('should add users when passed CREATE_USER_SUCCESS', () => {
    // arrange
    const initialState = [
      { name: 'A' },
      { name: 'B' }
    ];

    const newUser = { name: 'C' };

    const action = actions.createUsersSuccess(newUser);

    // act
    const newState = user(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual('A');
    expect(newState[1].name).toEqual('B');
    expect(newState[2].name).toEqual('C');
  });

  it('should update user when passed UPDATE_USER_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: 'A', name: 'A' },
      { id: 'B', name: 'B' },
      { id: 'C', name: 'C' }
    ];

    const userr = { id: 'B', name: 'New Name' };
    const action = actions.updateUsersSuccess(userr);

    // act
    const newState = user(initialState, action);
    const updatedUser = newState.find(a => a.id === userr.id);
    const untouchedUser = newState.find(a => a.id === 'A');

    // assert
    expect(updatedUser.name).toEqual('New Name');
    expect(untouchedUser.name).toEqual('A');
    expect(newState.length).toEqual(3);
  });
});
