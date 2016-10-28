import { apiBaseUrlSelector } from '../app/selector';
import * as usersApi from '../../api/users';
import { doLogin, doTryLoginFacebook } from '../app/actions';
import { SubmissionError } from 'redux-form/immutable';

export const REGISTER_USER_START = 'REGISTER_USER_START';
export function submit (values) {
  return async (dispatch, getState) => {
    try {
      const { dateOfBirth, firstname, gender, lastname, email, password } = values.toJS();
      dispatch({ type: REGISTER_USER_START });
      // Perform API call
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      await usersApi.register(apiBaseUrl, { dateOfBirth, email, gender, firstname, lastname, password });
      // Automatically log in
      await dispatch(doLogin({ email, password }));
    } catch (error) {
      if (error.body.message === 'user already exists') {
        throw new SubmissionError({ _error: 'register.userAlreadyExist' });
      }
      throw new SubmissionError({ _error: error });
    }
  };
}

export const REGISTER_FACEBOOK_USER_START = 'REGISTER_FACEBOOK_USER_START';
export const REGISTER_FACEBOOK_USER_SUCCESS = 'REGISTER_FACEBOOK_USER_SUCCESS';
export const REGISTER_FACEBOOK_USER_ERROR = 'REGISTER_FACEBOOK_USER_ERROR';
export function registerWithFacebook ({ email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, gender }) {
  return async (dispatch, getState) => {
    try {
      dispatch({ email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, gender, type: REGISTER_FACEBOOK_USER_START });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      await usersApi.registerWithFacebook(apiBaseUrl, { email, firstname, lastname, facebookAccessToken, facebookId, dateOfBirth, facebookGender: gender });
      await dispatch(doTryLoginFacebook({ facebookAccessToken }));
      return dispatch({ email, firstname, lastname, type: REGISTER_FACEBOOK_USER_SUCCESS });
    } catch (error) {
      if (error.body.message === 'user already exists') {
        try {
          await dispatch(doTryLoginFacebook({ facebookAccessToken }));
          return dispatch({ email, firstname, lastname, type: REGISTER_FACEBOOK_USER_SUCCESS });
        } catch (e) {
          if (e === 'login.invalidFacebook') {
            // User already exists and you can't login => You created an account without using Facebook.
            return dispatch({ error: 'register.facebookErrorAlreadyExists', email, firstname, lastname, type: REGISTER_FACEBOOK_USER_ERROR });
          }
          dispatch({ error: 'register.facebookError', email, firstname, lastname, type: REGISTER_FACEBOOK_USER_ERROR });
          throw e;
        }
      }
      dispatch({ error: '_common.unknown', email, firstname, lastname, dateOfBirth, gender, type: REGISTER_FACEBOOK_USER_ERROR });
      throw error;
    }
  };
}
