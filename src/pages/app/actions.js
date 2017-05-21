import cookie from 'react-cookie';
import * as api from '../../api/configuration';
import { apiBaseUrlSelector } from './selector';
import { getLocalStorage } from '../../utils';
// import { initUbToken, initBasketData, updateLocale as updateUbLocale } from '../basket/actions';
import * as newActions from '../../pages/newHome/actions';

const storage = getLocalStorage();

export const CONFIGURE = 'CONFIGURE';
export function doInit () {
  return async (dispatch) => {
    const configuration = await api.getConfiguration();
    // Extend configuration from server with the configuration saved in the cookie.
    configuration.acceptCookies = parseInt(cookie.load('acceptCookies'), 10);
    dispatch({ type: CONFIGURE, configuration });
  };
}

export const ACCEPT_COOKIES = 'ACCEPT_COOKIES';
export function acceptCookies () {
  const now = new Date();
  const nextYear = new Date(now.getTime());
  nextYear.setFullYear(nextYear.getFullYear() + 1);
  // Accept cookies and save the Unix timestamp in the cookie.
  cookie.save('acceptCookies', now.getTime(), { expires: nextYear, path: '/' });
  return { type: ACCEPT_COOKIES };
}

export const DOWNLOAD_PAGE_SHOWED = 'DOWNLOAD_PAGE_SHOWED';
export function downloadPageShowed () {
  return (dispatch, getState) => {
    const date = new Date();
    storage.setItem('downloadPageShowed', JSON.stringify(date));
    dispatch({ type: DOWNLOAD_PAGE_SHOWED, downloadPageShowed: date });
  };
}

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

// @TODO remove this dirty hack
export function checkUserDefaults (data) {
  return async (dispatch, getState) => {
    let isChanged = false;
    try {
      if (!data.user.currency) {
        data.user.currency = await dispatch(newActions.loadDefaultCurrency());
        data.user.currencyForm = data.user.currency.uuid;
        isChanged = true;
      }
      if (!data.user.language) {
        const defaultLanguage = await dispatch(newActions.loadDefaultLanguage());
        data.user.language = defaultLanguage;
        data.user.languageForm = defaultLanguage.uuid;
        isChanged = true;
      }
      if (!data.user.languages || !data.user.languages.length) {
        const defaultLanguage = await dispatch(newActions.loadDefaultLanguage());
        data.user.languages = [ defaultLanguage ];
        data.user.languagesForm = [ defaultLanguage.uuid ];
        isChanged = true;
      }
      if (!data.user.contentRegions || !data.user.contentRegions.length) {
        const defaultContentRegion = await dispatch(newActions.loadDefaultContentRegion());
        data.user.contentRegions = [ defaultContentRegion ];
        data.user.contentRegionsForm = [ `${defaultContentRegion.country.uuid}-${defaultContentRegion.language.uuid}` ];
        isChanged = true;
      }
      if (!data.user.shoppingCountries || !data.user.shoppingCountries.length) {
        const defaultShoppingCountry = await dispatch(newActions.loadDefaultCountry());
        data.user.shoppingCountries = [ defaultShoppingCountry ];
        data.user.shoppingCountriesForm = [ defaultShoppingCountry.uuid ];
        isChanged = true;
      }
      return { newData: data, isChanged };
    } catch (error) {
      console.log(error);
      return { newData: data, isChanged };
    }
  };
}

export function doLogin ({ email, password }) {
  return async (dispatch, getState) => {
    dispatch({ type: LOGIN_REQUEST });
    try {
      const baseUrl = apiBaseUrlSelector(getState());
      // const currentLocale = currentLocaleSelector(getState());
      const data = await api.login(baseUrl, { email, password });
      const { newData, isChanged } = await dispatch(checkUserDefaults(data));
      dispatch({ data: newData, type: LOGIN_SUCCESS });
      storage.setItem('session', JSON.stringify(newData));
      if (isChanged) {
        dispatch(newActions.updateUserProfileWrapper({ uuid: newData.user.id, data: { profile: newData.user } }));
      }
      /*
      if (data.user.id) {
        const ubToken = await dispatch(initUbToken(data.user.id));
        if (ubToken) {
          data.ubAuthenticationToken = ubToken;
        }
        dispatch(updateUbLocale(currentLocale));
      }
      */
      // dispatch(initBasketData());
      return newData;
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}

// @TODO check this for user defaults
export function doLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    // const currentLocale = currentLocaleSelector(getState());
    dispatch({ type: LOGIN_REQUEST });
    try {
      const data = await api.loginFacebook(baseUrl, { facebookAccessToken });
      dispatch({ data, type: LOGIN_SUCCESS });
      /*
      if (data.user.id) {
        const ubToken = await dispatch(initUbToken(data.user.id));
        if (ubToken) {
          data.ubAuthenticationToken = ubToken;
        }
        dispatch(updateUbLocale(currentLocale));
      }
      */
      storage.setItem('session', JSON.stringify(data));
      // dispatch(initBasketData());
    } catch (error) {
      dispatch({ error, type: LOGIN_FAILURE });
      throw error;
    }
  };
}

// @TODO check this for user defaults
export function doTryLoginFacebook ({ facebookAccessToken }) {
  return async (dispatch, getState) => {
    const baseUrl = apiBaseUrlSelector(getState());
    // const currentLocale = currentLocaleSelector(getState());
    const data = await api.loginFacebook(baseUrl, { facebookAccessToken });
    dispatch({ data, type: LOGIN_SUCCESS });
    /*
    if (data.user.id) {
      const ubToken = await dispatch(initUbToken(data.user.id));
      if (ubToken) {
        data.ubAuthenticationToken = ubToken;
      }
      dispatch(updateUbLocale(currentLocale));
    }
    */
    storage.setItem('session', JSON.stringify(data));
    // dispatch(initBasketData());
  };
}

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export function doLogout () {
  return (dispatch) => {
    dispatch({ type: LOGOUT_REQUEST });
    dispatch({ type: LOGOUT_SUCCESS });
    storage.removeItem('session');
  };
}

export const CHANGE_LOCALE = 'CHANGE_LOCALE';
export function changeLocale (locale) {
  return { locale, type: CHANGE_LOCALE };
}
