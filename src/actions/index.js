import { getConfiguration } from '../api/config';
/*
import * as authenticationApi from '../api/authentication';
import * as helloBankApi from '../api/helloBank';
*/

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await getConfiguration();
    dispatch({ type: CONFIGURE, configuration });
  };
}
/*
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export function doLogin ({ email, password }) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const {
        authenticationToken,
        user: {
          profile: { email: profileEmail, firstName, lastName },
          userName,
          uuid
        }
      } = await authenticationApi.login({ email, password });
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
export function doLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const {
        authenticationToken,
        user: {
          profile: { email: profileEmail, firstName, lastName },
          userName,
          uuid
        }
      } = await authenticationApi.loginFacebook({ facebookAccessToken });
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

export const OPEN_LOGIN_MODAL = 'OPEN_LOGIN_MODAL';
export function openLoginModal () {
  return { type: OPEN_LOGIN_MODAL };
}

export const CLOSE_LOGIN_MODAL = 'CLOSE_LOGIN_MODAL';
export function closeLoginModal () {
  return { type: CLOSE_LOGIN_MODAL };
}

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export function doRegister ({ email, firstname, lastname, password }) {
  return async (dispatch) => {
    dispatch({ type: REGISTER_REQUEST });
    try {
      await authenticationApi.register({ email, firstname, lastname, password });
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
    const isAuthenticated = state.auth.authenticationToken;

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
      const authenticationToken = state.auth.authenticationToken;
      const name = state.auth.user.firstname;
      await helloBankApi.postHellobankAnswer(authenticationToken, { birthdate, productCount });
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
*/
