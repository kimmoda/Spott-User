import { apiBaseUrlSelector } from '../app/selector';
import * as usersApi from '../../api/users';
import { doLogin, doLoginFacebook } from '../app/actions';

export const REGISTER_USER_START = 'REGISTER_USER_START';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_ERROR = 'REGISTER_USER_ERROR';
export function submit ({ email, firstname, lastname, password }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ email, firstname, lastname, password, type: REGISTER_USER_START });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);

      await usersApi.register(apiBaseUrl, { email, firstname, lastname, password });

      await dispatch(doLogin({ email, password }));
      // Dispatch success
      return dispatch({ email, firstname, lastname, password, type: REGISTER_USER_SUCCESS });
    } catch (error) {
      if (error.body.message === 'user already exists') {
        return dispatch({ error: { _error: 'register.userAlreadyExist' }, email, firstname, lastname, password, type: REGISTER_USER_ERROR });
      }
      return dispatch({ error, email, firstname, lastname, password, type: REGISTER_USER_ERROR });
    }
  };
}

export const REGISTER_USER_FACEBOOK_START = 'REGISTER_USER_FACEBOOK_START';
export const REGISTER_USER_FACEBOOK_SUCCESS = 'REGISTER_USER_FACEBOOK_SUCCESS';
export const REGISTER_USER_FACEBOOK_ERROR = 'REGISTER_USER_FACEBOOK_ERROR';
export function registerWithFacebook ({ email, firstname, lastname, facebookAccessToken, facebookId }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ email, firstname, lastname, facebookAccessToken, facebookId, type: REGISTER_USER_FACEBOOK_START });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);

      await usersApi.registerWithFacebook(apiBaseUrl, { email, firstname, lastname, facebookAccessToken, facebookId });
      console.log('registered, logging in');
      await dispatch(doLoginFacebook({ facebookAccessToken }));
      // Dispatch success
      return dispatch({ email, firstname, lastname, type: REGISTER_USER_FACEBOOK_SUCCESS });
    } catch (error) {
      if (error.body.message === 'user already exists') {
        return dispatch({ error: { _error: 'register.userAlreadyExist' }, email, firstname, lastname, type: REGISTER_USER_ERROR });
      }
      return dispatch({ error, email, firstname, lastname, type: REGISTER_USER_ERROR });
    }
  };
}
