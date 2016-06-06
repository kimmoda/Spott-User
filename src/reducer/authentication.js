import { Map, fromJS } from 'immutable';
import * as types from '../actions';

export default function authentication (state = fromJS({
  isLoginModalOpen: false,
  isLoading: false,
  user: {},
  authenticationToken: null
}), action) {
  switch (action.type) {
    case types.OPEN_LOGIN_MODAL:
      return state
        .set('isLoginModalOpen', true);
    case types.CLOSE_LOGIN_MODAL:
      return state
        .set('isLoginModalOpen', false);
    case types.LOGIN_REQUEST:
      return state
        .set('error', null)
        .set('isLoading', true);
    case types.LOGIN_SUCCESS:
      return state
        .set('isLoginModalOpen', false)
        .set('isLoading', false)
        .merge(action.data);
    case types.LOGIN_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case types.LOGOUT_SUCCESS:
      return state
        .set('authenticationToken', null)
        .set('user', Map({}));
    default:
      return state;
  }
}
