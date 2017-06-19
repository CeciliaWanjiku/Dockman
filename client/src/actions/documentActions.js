import * as types from './actionTypes';
import { getEndpoint, putEndpoint, postEndpoint, deleteEndpoint } from '../../utils/documentsAPI';

export const loadDocumentsSuccess = documents => ({ type: types.LOAD_DOCUMENT_SUCCESS, documents });
export const loadPublicDocumentsSuccess = documents =>
({ type: types.LOAD_PUBLIC_DOCUMENTS_SUCCESS, documents });
export const createDocumentsSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS, document });
export const updateDocumentsSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS, document });
export const deleteDocumentsSuccess = document =>
 ({ type: types.DELETE_DOCUMENT_SUCCESS, document });
export const searchDocumentsSuccess = documents =>
({ type: types.SEARCH_DOCUMENT_SUCCESS, documents });
export const userDocumentsSuccess = documents =>
({ type: types.USER_DOCUMENTS_SUCCESS, documents });


export const loadDocuments = (limit = 10, offset = 0) => (dispatch) => {
  getEndpoint(`/api/documents/?limit=${limit}&offset=${offset}`)
   .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => {
      if (err || !res.ok) {
        return ('error');
      }
      dispatch(loadDocumentsSuccess(res.body));
    });
};
export const loadPublicDocuments = () => (dispatch) => {
  getEndpoint('/api/documents/public')
    .end((err, res) => dispatch(loadPublicDocumentsSuccess(res.body)));
};

export const createDocument = doc => (dispatch) => {
  doc.userId = localStorage.getItem('user_id');
  postEndpoint('/api/documents')
    .set('access-token', localStorage.getItem('jwt'))
    .send(doc)
    .end((err, res) => dispatch(createDocumentsSuccess({ document: res.body })));
};
export const updateDocument = doc => (dispatch) => {
  putEndpoint(`/api/documents/${doc.id}`)
    .send(doc)
  .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => dispatch(updateDocumentsSuccess({ document: res.body })));
};
export const userDocuments = () => (dispatch) => {
  getEndpoint(`/users/${localStorage.getItem('user_id')}/documents`)
    .end((err, res) => dispatch(userDocumentsSuccess(res.body)));
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
