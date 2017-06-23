import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../../client/src/reducers/index';
import * as documentActions from '../../client/src/actions/documentActions';

describe('Store', () => {
  it('Should handle creating documents', () => {
    // arrange
    const store = createStore(rootReducer, {});
    const document = {
      name: 'doc doc'
    };

    // act
    const action = documentActions.createDocumentsSuccess(document);
    store.dispatch(action);

    // assert
    const actual = store.getState().documents[0];
    const expected = {
      name: 'doc doc'
    };

    expect(actual).toEqual(expected);
  });
});
