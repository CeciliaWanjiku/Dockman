import * as types from '../actions/actionTypes';

export default function document(state = [], action) {
  switch (action.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return action.documents;
    case types.CREATE_DOCUMENT_SUCCESS:
      return [
        ...state,
        Object.assign({}, action.document)
      ];
    case types.UPDATE_DOCUMENT_SUCCESS:
      return [
        ...state.filter(doc => doc.id !== action.document.id),
        Object.assign({}, action.document)
      ];

    default:
      return state;
  }
}
