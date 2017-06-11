import * as types from '../actions/actionTypes';
export default function document(state = [], actions) {
  switch (actions.type) {
    case types.CREATE_DOCUMENT:
      return [
        ...state,
        Object.assign({}, actions.document)
      ];
    default:
      return state;
  }
}
