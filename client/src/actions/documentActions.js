import * as types from './actionTypes';
//import document api
export function loadDocumentsSuccess(documents) {
  return { type: types.LOAD_DOCUMENT_SUCCESS, documents };
}

export function loadDocuments() {
  return function (dispatch) {
      return documentApi.getalldocuments()
        .then((documents) => {
          dispatch(loadDocumentsSuccess(documents));
        })
        .catch((error) => {
          throw (error);
        });
    };
}
