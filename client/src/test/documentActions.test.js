import expect from 'expect';
import * as documentActions from '../actions/documentActions';
import * as types from '../actions/actionTypes';

import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';

// Test a sync action
describe('Document Actions', () => {
  describe('createDpcumentSuccess', () => {
    it('should create a CREATE_DOCUMENT_SUCCESS action', () => {
      // arrange
      const document = { id: '80', name: 'test-document' };
      const expectedAction = {
        type: types.CREATE_DOCUMENT_SUCCESS,
        document
      };

      // act
      const action = documentActions.createDocumentSuccess(document);

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

  it('should create BEGIN_AJAX_CALL and LOAD_DOCUMENTS_SUCCESS when loading documents', (done) => {
    nock('http://localhost:8090/api/documents/')
      .get('/documents')
      .reply(200, { body: { document: [{ id: 1, name: 'Doc1', content: 'testcontent', category: 'public' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_DPCUMENTS_SUCCESS, body: { documents: [{ id: '80', name: 'test-document' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done);
    store.dispatch(documentActions.loadDocuments()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_DOCUMENTS_SUCCESS);
      done();
    });
  });
});
