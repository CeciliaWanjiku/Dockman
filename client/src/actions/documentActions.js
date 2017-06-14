import * as types from './actionTypes';
import { getEndpoint, putEndpoint, postEndpoint, deleteEndpoint } from '../../utils/documentsAPI';

export const loadDocumentsSuccess = documents => ({ type: types.LOAD_DOCUMENT_SUCCESS, documents });
export const createDocumentsSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS, document });
export const updateDocumentsSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS, document });
export const deleteDocumentsSuccess = document =>
 ({ type: types.DELETE_DOCUMENT_SUCCESS, document });
export const searchDocumentsSuccess = documents =>
({ type: types.SEARCH_DOCUMENT_SUCCESS, documents });


export const loadDocuments = (limit = 10, offset = 0) => (dispatch) => {
  getEndpoint(`/api/documents/?limit=${limit}&offset=${offset}`)
    .end((err, res) => dispatch(loadDocumentsSuccess(res.body)));
};
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
export function deleteDocument(doc) {
  return function (dispatch) {
    deleteEndpoint(`/api/documents/${doc.id}`)
    .send(doc)
    .end((err, res) => dispatch(deleteDocumentsSuccess({ document: res.body })));
  };
}
export function searchDocument(searchValue) {
  console.log(searchValue);
  searchValue = encodeURIComponent(searchValue);
  console.log(searchValue);
  return function (dispatch) {
    getEndpoint(`/api/search/documents?q=${searchValue}`)
    .end((err, res) => dispatch(searchDocumentsSuccess(res.body)));
  };
}
