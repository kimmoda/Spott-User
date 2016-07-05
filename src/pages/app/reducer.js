import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import { combineReducers } from 'redux-immutablejs';

function authentication (state = fromJS({
  isLoading: false,
  user: {},
  authenticationToken: null
}), action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return state
        .set('error', null)
        .set('isLoading', true);
    case actions.LOGIN_SUCCESS:
      return state
        .set('isLoginModalOpen', false)
        .set('isLoading', false)
        .merge(fromJS(action.data));
    case actions.LOGIN_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case actions.LOGOUT_SUCCESS:
      return state
        .set('authenticationToken', null)
        .set('user', Map({}));
    default:
      return state;
  }
}

function configuration (state = Map({ currentLocale: 'fr' }), action) {
  switch (action.type) {
    case actions.CONFIGURE:
      return state.merge(fromJS(action.configuration));
  }
  return state;
}

export default combineReducers({
  authentication,
  configuration
});
