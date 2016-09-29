import { fromJS } from 'immutable';
import * as actions from './actions';

export default (state = fromJS({ isLoading: false, isSuccessful: false }), action) => {
  switch (action.type) {
    case actions.RESET_PASSWORD_REQUEST:
      return state
        .set('error', null)
        .set('isLoading', true)
        .set('isSuccessful', false);
    case actions.RESET_PASSWORD_SUCCESS:
      return state
        .set('error', null)
        .set('isLoading', false)
        .set('isSuccessful', true);
    case actions.RESET_PASSWORD_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false)
        .set('isSuccessful', false);
    default:
      return state;
  }
};
