import { Map, fromJS } from 'immutable';
import * as actions from './actions';
import * as newActions from '../actions';
import { combineReducers } from 'redux-immutablejs';

function authentication (state = fromJS({
  isLoading: false,
  user: {},
  initialValues: null,
  authenticationToken: null,
  ubAuthenticationToken: null
}), action) {
  switch (action.type) {
    case actions.LOGIN_REQUEST:
      return state
        .set('error', null)
        .set('isLoading', true);
    case actions.LOGIN_SUCCESS:
      return state
        .set('error', null)
        .set('isLoginModalOpen', false)
        .set('isLoading', false)
        .merge(fromJS(action.data))
        .set('initialValues', action.data.initialValues ? Map({ ...action.data.initialValues }) : null);
    case newActions.UPDATE_USER_PROFILE_SUCCESS:
      return state
        .mergeIn([ 'user' ], fromJS(action.data.profile))
        .set('initialValues', Map({ ...action.data.initialValues }));
    case newActions.UPDATE_USER_AVATAR_SUCCESS:
      return state
        .mergeIn([ 'user' ], fromJS(action.data.profile));
    case newActions.UPDATE_USER_BACKGROUND_SUCCESS:
      return state
        .mergeIn([ 'user' ], fromJS(action.data.profile));
    case newActions.SET_USER_PROFILE_ACCOUNT:
      return state
        .mergeIn([ 'user' ], fromJS(action.data.profile))
        .set('initialValues', Map({ ...action.data.initialValues }));
    case actions.LOGIN_FAILURE:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case actions.LOGOUT_SUCCESS:
      return state
        .set('authenticationToken', null)
        .set('ubAuthenticationToken', null)
        .set('user', Map({}))
        .set('initialValues', null);
    default:
      return state;
  }
}

function registration (state = fromJS({ isLoading: false }), action) {
  switch (action.type) {
    case newActions.REGISTER_FACEBOOK_USER_START:
      return state
        .set('error', null)
        .set('isLoading', true);
    case newActions.REGISTER_FACEBOOK_USER_SUCCESS:
      return state
        .set('error', null)
        .set('isLoading', false);
    case newActions.REGISTER_FACEBOOK_USER_ERROR:
      return state
        .set('error', action.error)
        .set('isLoading', false);
    case newActions.REGISTER_USER_START: // Remove facebook error on standard register
      return state
        .set('error', null);
    default:
      return state;
  }
}

function configuration (state = Map({ currentLocale: 'en' }), action) {
  switch (action.type) {
    case actions.ACCEPT_COOKIES:
      return state.set('acceptCookies', true);
    case actions.CONFIGURE:
      return state.merge(fromJS(action.configuration));
    case actions.CHANGE_LOCALE:
      return state.set('currentLocale', action.locale);
    case actions.DOWNLOAD_PAGE_SHOWED:
      return state.set('downloadPageShowed', action.downloadPageShowed);
  }
  return state;
}

export default combineReducers({
  authentication,
  registration,
  configuration
});
