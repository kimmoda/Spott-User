import { authenticationTokenSelector, apiBaseUrlSelector, currentUserFirstnameSelector } from '../../app/selector';
import * as api from './api';
import { doLogin } from '../../app/actions';

export const REGISTER_REQUEST = 'REGISTER_REQUEST';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export function doRegister ({ email, firstname, lastname, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: REGISTER_REQUEST });
    const baseUrl = apiBaseUrlSelector(getState());
    try {
      await api.register(baseUrl, { email, firstname, lastname, password });
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
      const name = currentUserFirstnameSelector(state);
      await api.postHellobankAnswer(baseUrl, authenticationToken, { birthdate, productCount });
      dispatch({ type: HELLOBANK_SUCCESS });
      return { name };
    } catch (error) {
      if (error.body.message === 'gebruiker bestaat reeds') {
        throw dispatch({ error: 'Er is reeds een Spott-gebruiker geregistreerd onder dit e-mailadres. Gelieve je aan te melden via bovenstaande link.', type: HELLOBANK_FAILURE });
      }
      throw dispatch({ error: (error.body && error.body.message) || error.message, type: HELLOBANK_FAILURE });
    }
  };
}
