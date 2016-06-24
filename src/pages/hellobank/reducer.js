import * as actions from './actions';
import { fromJS } from 'immutable';

export default function hellobank (state = fromJS({}), action) {
  switch (action.type) {
    case actions.HELLOBANK_REQUEST:
      return state.set('hellobankError', null);
    case actions.HELLOBANK_SUCCESS:
      return state.set('hellobankError', null);
    case actions.HELLOBANK_FAILURE:
      return state.set('hellobankError', action.error);
    default:
      return state;
  }
}
