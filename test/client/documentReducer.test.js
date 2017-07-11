import expect from 'expect';
import document from '../../client/src/reducers/document';
import * as actions from '../../client/src/actions/documentActions';

describe('Document Reducer', () => {
  it('should add document when passed CREATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { name: 'A' },
      { name: 'B' }
    ];

    const newDocument = { name: 'C' };

    const action = actions.createDocumentsSuccess(newDocument);

    // act
    const newState = document(initialState, action);

    // assert
    expect(newState.length).toEqual(3);
    expect(newState[0].name).toEqual('A');
    expect(newState[1].name).toEqual('B');
    // expect(newState[2].name).toEqual('C');
  });

  it('should update document when passed UPDATE_DOCUMENT_SUCCESS', () => {
    // arrange
    const initialState = [
      { id: 'A', name: 'A' },
      { id: 'B', name: 'B' },
      { id: 'C', name: 'C' }
    ];

    const doc = { id: 'B', name: 'New Title' };
    const action = actions.updateDocumentsSuccess(doc);

    // act
    const newState = document(initialState, action);
    const updatedDocument = newState.find(a => a.id === doc.id);
    const untouchedDocument = newState.find(a => a.id === 'A');

    // assert
    expect(updatedDocument.name).toEqual('New Title');
    expect(untouchedDocument.name).toEqual('A');
    expect(newState.length).toEqual(3);
  });
  it('should load documents when passed LOAD_DOCUMENT_SUCCESS', () => {
    // arrange
    // const initialState = [
    //   { id: 'A', name: 'A' },
    //   { id: 'B', name: 'B' },
    //   { id: 'C', name: 'C' }
    // ];
    const initialState = [];
    const documents = [{ id: 'B', name: 'New Title' }];
    // const action = actions.loadDocumentsSuccess(documents);
    const action = { type: 'LOAD_DOCUMENT_SUCCESS', documents };

    // act
    const newState = document(initialState, action);
    // assert
    expect(newState).toEqual(documents);
    // expect(document.name).toEqual('New Title');
    // expect(newState.length).toEqual(3);
  });
  it('it should get search result when passed SEARCH_DOCUMENT_SUCCESS', () => {
    const initialState = [];
    const documents = [
      { id: 'A', name: 'A', content: 'M', }
    ];
    const action = actions.searchDocumentsSuccess(documents);
    const newState = document(initialState, action);
    expect(newState.length).toEqual(1);
  });
  it('it should delete a document when passed DELETE_DOCUMENT_SUCCESS', () => {
    const initialState = [];
    const documents = [
      { id: 'A', name: 'A', content: 'M', }
    ];
    const action = actions.deleteDocumentsSuccess(documents);
    const newState = document(initialState, action);
    expect(newState.length).toEqual(0);
  });
});
