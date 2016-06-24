import * as api from './api';
import { apiBaseUrlSelector } from './selector';

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await api.getConfiguration();
    dispatch({ type: CONFIGURE, configuration });
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function doLogin ({ email, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const baseUrl = apiBaseUrlSelector(getState());
      const data = await api.login(baseUrl, { email, password });
      dispatch({ data, type: LOGIN_SUCCESS });
      if (localStorage) {
        localStorage.setItem('session', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}
export function doLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    dispatch({ type: LOGIN_REQUEST });
    try {
      const {
        body: {
          authenticationToken,
          user: {
            profile: { email: profileEmail, firstName, lastName },
            userName,
            uuid
          }
        }
      } = await api.loginFacebook(baseUrl, { facebookAccessToken });
      const data = {
        authenticationToken,
        user: {
          email: profileEmail,
          firstname: firstName,
          id: uuid,
          lastname: lastName,
          username: userName
        }
      };
      dispatch({ data, type: LOGIN_SUCCESS });
      if (localStorage) {
        localStorage.setItem('session', JSON.stringify(data));
      }
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export function doLogout () {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
    if (localStorage) {
      localStorage.removeItem('session');
    }
  };
}
