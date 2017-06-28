import expect from 'expect';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import rootReducer from '../../client/src/reducers/index';
import * as documentActions from '../../client/src/actions/documentActions';

const mockStore = configureMockStore([thunk]);

describe('Store', () => {
  it('Should handle creating documents', () => {
    // arrange
    const document = {
      name: 'doc doc'
    };
    const store = mockStore(document);

    const expectedActions =  { type: 'CREATE_DOCUMENT_SUCCESS', document }
    
    // act
    const action = documentActions.createDocumentsSuccess(document);
    store.dispatch(action);
    expect(store.getState()).toEqual(document);
    

    // assert
    // console.log('>>>>>store>>>>>', store.getState());
    // const actual = store.getState().documents[0];

    // expect(actual).toEqual(document);
  });
});
