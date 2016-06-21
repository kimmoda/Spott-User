import * as actions from './actions';

export default function auth (state = {}, action) {
  switch (action.type) {
    case actions.HELLOBANK_REQUEST:
      return { ...state, hellobankError: null };
    case actions.HELLOBANK_SUCCESS:
      return { ...state, hellobankError: null };
    case actions.HELLOBANK_FAILURE:
      return { ...state, hellobankError: action.error };
    default:
      return state;
  }
}
