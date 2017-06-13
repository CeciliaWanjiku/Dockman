import * as types from './actionTypes';
import { getEndpoint, putEndpoint } from '../../utils/documentsAPI';

export function loadDocumentsSuccess(users) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, users };
}
export function updateDocumentsSuccess(documents) {
  return { type: types.UPDATE_DOCUMENT_SUCCESS, documents };
}

export function loadDocuments() {
  return function (dispatch) {
    getEndpoint('/api/documents/')
    .end((err, res) => dispatch(loadDocumentsSuccess(res.body)));
  };
}
export function updateDocument(document) {
  return function (dispatch, getState) {
    putEndpoint('/api/documents/:userId')
    .end((err, res) => dispatch(updateDocumentsSuccess(res.body)));
  };
}
