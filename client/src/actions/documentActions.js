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
    .end((err, res) => {
      if (err || !res.ok) {
        return ('error');
      }
      dispatch(loadDocumentsSuccess(res.body));
    });
};
export const createDocument = doc => (dispatch) => {
  postEndpoint('/api/documents')
    .send(doc)
    .end((err, res) => dispatch(createDocumentsSuccess({ document: res.body })));
};
export const updateDocument = doc => (dispatch) => {
  putEndpoint(`/api/documents/${doc.id}`)
    .send(doc)
    .end((err, res) => dispatch(updateDocumentsSuccess({ document: res.body })));
};
export const deleteDocument = doc => (dispatch) => {
  deleteEndpoint(`/api/documents/${doc.id}`)
    .send(doc)
    .end((err, res) => dispatch(deleteDocumentsSuccess({ document: res.body })));
};
export const searchDocument = (searchValue) => {
  searchValue = encodeURIComponent(searchValue);
  return (dispatch) => {
    getEndpoint(`/api/search/documents?q=${searchValue}`)
    .end((err, res) => dispatch(searchDocumentsSuccess(res.body)));
  };
};
