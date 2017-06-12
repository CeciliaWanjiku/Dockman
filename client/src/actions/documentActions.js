import * as types from './actionTypes';
import { getEndpoint } from '../../utils/documentsAPI';

export function loadDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}

export function loadDocuments() {
  return function (dispatch) {
    getEndpoint('/api/documents/')
    .end((err, res) => dispatch(loadDocumentsSuccess(res.body)));
  };
}

