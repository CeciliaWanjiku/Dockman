import expect from 'expect';
import document from '../reducers/document';
import * as actions from '../actions/documentActions';

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
    expect(newState[2].name).toEqual('C');
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
});
