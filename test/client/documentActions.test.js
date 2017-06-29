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
  // afterEach(() => {
  //   nock.cleanAll();
  // });

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
  it('should create BEGIN_AJAX_CALL and SEARCH_DOCUMENT_SUCCESS when loading documents', (done) => {
    nock('http://localhost:8090/')
     .get('/api/search/documents?q=doc')
    .reply(200, { body: { document: [{ id: 2, name: 'Document 2', content: 'there is no content' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.SEARCH_DOCUMENT_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.searchDocument()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.SEARCH_DOCUMENT_SUCCESS);
      done();
    });
  });
  it('should create BEGIN_AJAX_CALL and LOAD_PUBLIC_DOCUMENTS_SUCCESS when loading documents', (done) => {
    nock('http://localhost:8090/')
     .get('/api/documents/public')
    .reply(200, { body: { document: [{ id: 2, name: 'Document 2', content: 'there is no content' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.LOAD_PUBLIC_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.loadPublicDocuments()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.LOAD_PUBLIC_DOCUMENTS_SUCCESS);
      done();
    });
  });
  it('should create BEGIN_AJAX_CALL and LOAD_USER_DOCUMENT_SUCCESS when loading documents', (done) => {
    nock('http://localhost:8090/')
     .get('/users/2/documents')
    .reply(200, { body: { document: [{ id: 2, name: 'Document 2', content: 'there is no content' }] } });

    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.USER_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.userDocumentsSuccess()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.USER_DOCUMENTS_SUCCESS);
      done();
    });
  });
  it('should create a document', (done) => {
    const doc = {
      name: 'foo',
      content: 'bar',
      category: 'public'
    };
    nock('http://localhost:8090/')
     .post('/api/documents')
    .reply(201, { body: { document: [{ id: 2, name: 'foo', content: 'bar' }] } });
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.USER_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.createDocument(doc)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.CREATE_DOCUMENT_SUCCESS);
      done();
    });
  });
  it('should update a document', (done) => {
    const doc = {
      name: 'foo',
      content: 'bar',
      category: 'public'
    };
    nock('http://localhost:8090/')
     .put('/api/documents')
    .reply(201, { body: { document: [{ id: 2, name: 'foo', content: 'bar' }] } });
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.USER_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.updateDocument(doc)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.UPDATE_DOCUMENT_SUCCESS);
      done();
    });
  });
  it('should delete a document', (done) => {
    nock('http://localhost:8090/')
     .delete('/api/documents/2')
    .reply(201, { body: { document: [{ id: 2, name: 'foo', content: 'bar' }] } });
    const expectedActions = [
      { type: types.BEGIN_AJAX_CALL },
      { type: types.DELETE_DOCUMENTS_SUCCESS, body: { DOCUMENTS: [{ id: '60', name: 'Document 60' }] } }
    ];

    const store = mockStore({ documents: [] }, expectedActions, done());
    store.dispatch(documentActions.deleteDocument(2)).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toEqual(types.BEGIN_AJAX_CALL);
      expect(actions[1].type).toEqual(types.DELETE_DOCUMENT_SUCCESS);
      done();
    });
  });
});

