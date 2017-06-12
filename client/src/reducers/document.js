import * as types from '../actions/actionTypes';
export default function document(state = [], actions) {
  switch (actions.type) {
    case types.LOAD_DOCUMENT_SUCCESS:
      return actions.documents;
    default:
      return state;
  }
}
