import expect from 'expect';
import thunk from 'redux-thunk';
import nock from 'nock';
import configureMockStore from 'redux-mock-store';
import * as documentActions from '../../client/src/actions/documentActions';
import * as types from '../../client/src/actions/actionTypes';


// Test a sync action
describe('Document Actions', () => {
  describe('createDocumentSuccess', () => {
    it('should create a CREATE_DOCUMENT_SUCCESS action', () => {
      // arrange
      const document = { id: '60', name: 'Document 60' };
      const expectedAction = {
        type: types.CREATE_DOCUMENT_SUCCESS,
        document
      };

      // act
      const action = documentActions.createDocumentsSuccess(document);

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
    nock('http://localhost:8090/')
     .get('/api/documents')
    .reply(200, { body: { document: [{ id: 2, name: 'Document 2', content: 'there is no content' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.loadDocuments()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_DOCUMENTS_SUCCESS);
      done();
    });
  });
});
