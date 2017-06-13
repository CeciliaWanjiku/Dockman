import * as types from './actionTypes';
import { getEndpoint, putEndpoint, postEndpoint } from '../../utils/documentsAPI';

export function loadDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}
export function createDocumentsSuccess(document) {
  return { type: types.CREATE_DOCUMENT_SUCCESS, document };
}
export function updateDocumentsSuccess(document) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, document };
}

export function loadDocuments() {
  return function (dispatch) {
    getEndpoint('/api/documents/')
    .end((err, res) => dispatch(loadDocumentsSuccess(res.body)));
  };
}
export function createDocument(doc) {
  return function (dispatch) {
    postEndpoint('/api/documents')
    .send(doc)
    .end((err, res) => dispatch(createDocumentsSuccess({ document: res.body })));
  };
}
export function updateDocument(doc) {
  return function (dispatch) {
    putEndpoint(`/api/documents/${doc.id}`)
    .send(doc)
    .end((err, res) => dispatch(updateDocumentsSuccess({ document: res.body })));
  };
}
