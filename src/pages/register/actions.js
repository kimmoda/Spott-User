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

export function registerWithFacebook ({ email, firstname, lastname, facebookAccessToken, facebookId, birthday, gender }) {
  return async (dispatch, getState) => {
    console.log(arguments);
    try {
      dispatch({ email, firstname, lastname, facebookAccessToken, facebookId, birthday, gender, type: REGISTER_USER_START });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);

      await usersApi.registerWithFacebook(apiBaseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, birthday, gender });
      console.log('registered, logging in');
      await dispatch(doLoginFacebook({ facebookAccessToken }));
      // Dispatch success
      return dispatch({ email, firstname, lastname, type: REGISTER_USER_SUCCESS });
    } catch (error) {
      if (error.body.message === 'user already exists') {
        await dispatch(doLoginFacebook({ facebookAccessToken }));
        return dispatch({ email, firstname, lastname, type: REGISTER_USER_SUCCESS });
      }
      return dispatch({ error: 'Not enough information, please provide your email adres through Facebook or register without facebook', email, firstname, lastname, birthday, gender, type: REGISTER_USER_ERROR });
    }
  };
}
