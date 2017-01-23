import { makeUbApiActionCreator, makeApiActionCreator } from '../../data/actions';
import * as ubApi from '../../api/ub';
import { SubmissionError } from 'redux-form/immutable';

// Action types
// ////////////

export const ADD_PRODUCT_START = 'BASKET/ADD_PRODUCT_START';
export const ADD_PRODUCT_SUCCESS = 'BASKET/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'BASKET/ADD_PRODUCT_ERROR';

export const REMOVE_PRODUCT_START = 'BASKET/REMOVE_PRODUCT_START';
export const REMOVE_PRODUCT_SUCCESS = 'BASKET/REMOVE_PRODUCT_SUCCESS';
export const REMOVE_PRODUCT_ERROR = 'BASKET/REMOVE_PRODUCT_ERROR';

export const LOAD_BASKET_START = 'BASKET/LOAD_BASKET_START';
export const LOAD_BASKET_SUCCESS = 'BASKET/LOAD_BASKET_SUCCESS';
export const LOAD_BASKET_ERROR = 'BASKET/LOAD_BASKET_ERROR';

export const GET_UB_TOKEN_START = 'BASKET/GET_UB_TOKEN_START';
export const GET_UB_TOKEN_SUCCESS = 'BASKET/GET_UB_TOKEN_SUCCESS';
export const GET_UB_TOKEN_ERROR = 'BASKET/GET_UB_TOKEN_ERROR';

export const LOAD_UB_TOKEN_START = 'BASKET/LOAD_UB_TOKEN_START';
export const LOAD_UB_TOKEN_SUCCESS = 'BASKET/LOAD_UB_TOKEN_SUCCESS';
export const LOAD_UB_TOKEN_ERROR = 'BASKET/LOAD_UB_TOKEN_ERROR';

export const SET_UB_TOKEN_START = 'BASKET/SET_UB_TOKEN_START';
export const SET_UB_TOKEN_SUCCESS = 'BASKET/SET_UB_TOKEN_SUCCESS';
export const SET_UB_TOKEN_ERROR = 'BASKET/SET_UB_TOKEN_ERROR';

export const SUBMIT_MOBILE_START = 'BASKET/SUBMIT_MOBILE_START';
export const SUBMIT_MOBILE_SUCCESS = 'BASKET/SUBMIT_MOBILE_SUCCESS';
export const SUBMIT_MOBILE_ERROR = 'BASKET/SUBMIT_MOBILE_ERROR';

export const SET_PERSONAL_INFO = 'BASKET/SET_PERSONAL_INFO';

export const VERIFY_MOBILE_START = 'BASKET/VERIFY_MOBILE_START';
export const VERIFY_MOBILE_SUCCESS = 'BASKET/VERIFY_MOBILE_SUCCESS';
export const VERIFY_MOBILE_ERROR = 'BASKET/VERIFY_MOBILE_ERROR';

export const UPDATE_PERSONAL_INFO_START = 'BASKET/UPDATE_PERSONAL_INFO_START';
export const UPDATE_PERSONAL_INFO_SUCCESS = 'BASKET/UPDATE_PERSONAL_INFO_SUCCESS';
export const UPDATE_PERSONAL_INFO_ERROR = 'BASKET/UPDATE_PERSONAL_INFO_ERROR';

export const LOAD_UB_USER_START = 'BASKET/LOAD_UB_USER_START';
export const LOAD_UB_USER_SUCCESS = 'BASKET/LOAD_UB_USER_SUCCESS';
export const LOAD_UB_USER_ERROR = 'BASKET/LOAD_UB_USER_ERROR';

// Actions creators
// ////////////////

export const addToBasket = makeUbApiActionCreator(ubApi.addProductToBasket, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR);

export const removeFromBasket = makeUbApiActionCreator(ubApi.removeProductFromBasket, REMOVE_PRODUCT_START, REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_ERROR);

export const loadBasketData = makeUbApiActionCreator(ubApi.loadBasket, LOAD_BASKET_START, LOAD_BASKET_SUCCESS, LOAD_BASKET_ERROR);

export const loadNewUbToken = makeUbApiActionCreator(ubApi.getNewUbToken, GET_UB_TOKEN_START, GET_UB_TOKEN_SUCCESS, GET_UB_TOKEN_ERROR);

export const loadUbToken = makeApiActionCreator(ubApi.geUbToken, LOAD_UB_TOKEN_START, LOAD_UB_TOKEN_SUCCESS, LOAD_UB_TOKEN_ERROR);

export const setUbToken = makeApiActionCreator(ubApi.setUbToken, SET_UB_TOKEN_START, SET_UB_TOKEN_SUCCESS, SET_UB_TOKEN_ERROR);

export function initUbToken (userId) {
  return async (dispatch, getState) => {
    try {
      return await dispatch(loadUbToken({ userId }));
    } catch (error) {
      if (error.statusCode === 404) {
        const ubToken = await dispatch(loadNewUbToken());
        if (ubToken) {
          return await dispatch(setUbToken({ userId, ubToken }));
        }
        return null;
      }
      throw error;
    }
  };
}

export const submitMobile = makeUbApiActionCreator(ubApi.submitMobileNumber, SUBMIT_MOBILE_START, SUBMIT_MOBILE_SUCCESS, SUBMIT_MOBILE_ERROR);

export const verifyMobile = makeUbApiActionCreator(ubApi.verifyMobileNumber, VERIFY_MOBILE_START, VERIFY_MOBILE_SUCCESS, VERIFY_MOBILE_ERROR);

export const updatePersonalInfo = makeUbApiActionCreator(ubApi.updateInfo, UPDATE_PERSONAL_INFO_START, UPDATE_PERSONAL_INFO_SUCCESS, UPDATE_PERSONAL_INFO_ERROR);

export const loadUbUser = makeUbApiActionCreator(ubApi.retrieveUser, LOAD_UB_USER_START, LOAD_UB_USER_SUCCESS, LOAD_UB_USER_ERROR);

export function initUbUser (values) {
  return async (dispatch, getState) => {
    try {
      const { number, email } = values.toJS();
      const { userIsRegistered, verify } = await dispatch(submitMobile({ number }));
      if (userIsRegistered || !verify) {
        throw new SubmissionError({ _error: { message: 'User is already exist' } });
      }
      dispatch({ type: SET_PERSONAL_INFO, payload: { number, email } });
      return true;
    } catch (error) {
      throw error;
    }
  };
}

/* eslint-disable camelcase */
export function createUbUser (values, userId, personalInfo) {
  return async (dispatch, getState) => {
    try {
      const { code } = values.toJS();
      const { number, email } = personalInfo.toJS();
      const { access_token } = await dispatch(verifyMobile({ code, number }));
      if (access_token) {
        await dispatch(setUbToken({ userId, ubToken: access_token }));
        await dispatch(updatePersonalInfo({ number, email }));
        await dispatch(loadUbUser());
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
}
