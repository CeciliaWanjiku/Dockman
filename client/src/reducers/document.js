import { browserHistory } from 'react-router';
import * as types from '../actions/actionTypes';

export default function document(state = [], action) {
  switch (action.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return action.documents;
    case types.LOAD_PUBLIC_DOCUMENTS_SUCCESS:
      return action.documents;
    case types.USER_DOCUMENTS_SUCCESS:
      action.documents.count = action.count;
      return action.documents;


    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document.document)
      ];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(doc => doc.id !== action.document.id),
        Object.assign({}, action.document)
      ];
    case types.DELETE_DOCUMENT_SUCCESS: {
      const indexOfDocumentToDelete = state.findIndex(doc => doc.id === action.document.id);
      return [
        ...state.slice(0, indexOfDocumentToDelete),
        ...state.slice(indexOfDocumentToDelete + 1)
      ];
    }
    case types.SEARCH_DOCUMENT_SUCCESS:
      return action.documents;

    default:
      return state;
  }
}
