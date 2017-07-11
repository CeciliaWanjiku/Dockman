import * as types from './actionTypes';
import toastr from 'toastr';
import { getEndpoint, putEndpoint, postEndpoint, deleteEndpoint } from '../../utils/documentsAPI';

export const loadDocumentsSuccess = documents => ({ type: types.LOAD_DOCUMENT_SUCCESS, documents });
export const loadPublicDocumentsSuccess = documents =>
({ type: types.LOAD_PUBLIC_DOCUMENTS_SUCCESS,
  count: documents.count,
  documents });
export const createDocumentsSuccess = document => ({
  type: types.CREATE_DOCUMENT_SUCCESS, document });
export const updateDocumentsSuccess = document => ({
  type: types.UPDATE_DOCUMENT_SUCCESS, document });
export const deleteDocumentsSuccess = document =>
 ({ type: types.DELETE_DOCUMENT_SUCCESS, document });
export const searchDocumentsSuccess = documents =>
({ type: types.SEARCH_DOCUMENT_SUCCESS, documents });
export const userDocumentsSuccess = documents =>
({ type: types.USER_DOCUMENTS_SUCCESS,
  count: documents.count,
  documents });

export const loadDocuments = (limit = 10, offset = 0) => (dispatch) => {
  getEndpoint(`/api/documents/?limit=${limit}&offset=${offset}`)
   .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => {
      if (err || !res.ok) {
        // toastr.error('Unauthorized');
        return;
      }
      res.body.data.count = res.body.count;
      dispatch(loadDocumentsSuccess(res.body.data));
    });
};

export const loadPublicDocuments = (limit, offset) => (dispatch) => {
  getEndpoint(`/api/documents/public/?limit=${limit}&offset=${offset}`)
    .end((err, res) => {
      if (err || !res) {
        return err;
      }
      console.log('there is', res.body.data);
      console.log('count heere', res.body.count);
      res.body.data.count = res.body.count;
      dispatch(loadPublicDocumentsSuccess(res.body.data));
    });
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
    .set('access-token', localStorage.getItem('jwt'))
    .send(doc)
    .end((err, res) => dispatch(updateDocumentsSuccess(res.body)));
};
export const userDocuments = (limit, offset, userRole) => (dispatch) => {


  getEndpoint(`/users/${localStorage.getItem('user_id')}/documents?role_type=${userRole}&limit=${limit}&offset=${offset}`)

   .set('access-token', localStorage.getItem('jwt'))
    .end((err, res) => {
      if (err || !res.ok) {
        return err;
      }
      res.body.data.count = res.body.count;
      dispatch(userDocumentsSuccess(res.body.data));
    });
};

export const deleteDocument = doc => (dispatch) => {
  console.log('Getting here...');
  return deleteEndpoint(`/api/documents/${doc.id}`)
    .set('access-token', localStorage.getItem('jwt'))
    .then((res) => { dispatch(deleteDocumentsSuccess(res.body)); })
    .catch(console.log);
};

export const searchDocument = (searchValue) => {
  searchValue = encodeURIComponent(searchValue);
  return (dispatch) => {
    getEndpoint(`/api/search/documents?q=${searchValue}`)
    .end((err, res) => {
      if (res.body.length < 1) {
        toastr.error('Not Found');
        return dispatch(searchDocumentsSuccess(res.body));
      }
      return dispatch(searchDocumentsSuccess(res.body));
    });
  };
};
