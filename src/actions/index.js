import { getConfiguration } from '../api/config';
import * as authenticationApi from '../api/authentication';
import { authenticationTokenSelector, apiBaseUrlSelector, userFirstnameSelector } from '../selectors';
import * as helloBankApi from '../api/helloBank';

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await getConfiguration();
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
      const data = await authenticationApi.login(baseUrl, { email, password });
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
      } = await authenticationApi.loginFacebook(baseUrl, { facebookAccessToken });
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

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export function doRegister ({ email, firstname, lastname, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: REGISTER_REQUEST });
    const baseUrl = apiBaseUrlSelector(getState());
    try {
      await authenticationApi.register(baseUrl, { email, firstname, lastname, password });
      dispatch({ type: REGISTER_SUCCESS });
    } catch (error) {
      dispatch({ error, type: REGISTER_FAILURE });
      throw error;
    }
  };
}

export const HELLOBANK_REQUEST = 'HELLOBANK_REQUEST';
export const HELLOBANK_SUCCESS = 'HELLOBANK_SUCCESS';
export const HELLOBANK_FAILURE = 'HELLOBANK_FAILURE';
export function submitHellobank ({ birthdate, email, firstname, lastname, password, productCount }) {
  return async (dispatch, getState) => {
    let state = getState();
    const isAuthenticated = Boolean(authenticationTokenSelector(state));

    dispatch({ type: HELLOBANK_REQUEST });
    try {
      if (!isAuthenticated) {
        // Register the user and ...
        await dispatch(doRegister({ email, firstname, lastname, password }));
        // immediatly login.
        await dispatch(doLogin({ email, password }));
      }
      // Get new state that contains the authentication token.
      state = getState();
      const authenticationToken = authenticationTokenSelector(state);
      const baseUrl = apiBaseUrlSelector(getState());
      const name = userFirstnameSelector(state);
      await helloBankApi.postHellobankAnswer(baseUrl, authenticationToken, { birthdate, productCount });
      dispatch({ type: HELLOBANK_SUCCESS });
      return { name };
    } catch (error) {
      if (error === 'gebruiker bestaat reeds') {
        return dispatch({ error: 'Er is reeds een Spott-gebruiker geregistreerd onder dit e-mailadres. Gelieve je aan te melden via bovenstaande link.', type: HELLOBANK_FAILURE });
      }
      dispatch({ error, type: HELLOBANK_FAILURE });
    }
  };
}
