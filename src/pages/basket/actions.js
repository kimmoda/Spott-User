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

export const ADD_NEW_ADDRESS_START = 'BASKET/ADD_NEW_ADDRESS_START';
export const ADD_NEW_ADDRESS_SUCCESS = 'BASKET/ADD_NEW_ADDRESS_SUCCESS';
export const ADD_NEW_ADDRESS_ERROR = 'BASKET/ADD_NEW_ADDRESS_ERROR';

export const LOAD_UB_USER_ADDRESSES_START = 'BASKET/LOAD_UB_USER_ADDRESSES_START';
export const LOAD_UB_USER_ADDRESSES_SUCCESS = 'BASKET/LOAD_UB_USER_ADDRESSES_SUCCESS';
export const LOAD_UB_USER_ADDRESSES_ERROR = 'BASKET/LOAD_UB_USER_ADDRESSES_ERROR';

export const SELECT_ADDRESS_START = 'BASKET/SELECT_ADDRESS_START';
export const SELECT_ADDRESS_SUCCESS = 'BASKET/SELECT_ADDRESS_SUCCESS';
export const SELECT_ADDRESS_ERROR = 'BASKET/SELECT_ADDRESS_ERROR';

export const ADD_NEW_CARD_START = 'BASKET/ADD_NEW_CARD_START';
export const ADD_NEW_CARD_SUCCESS = 'BASKET/ADD_NEW_CARD_SUCCESS';
export const ADD_NEW_CARD_ERROR = 'BASKET/ADD_NEW_CARD_ERROR';

export const LOAD_CARDS_START = 'BASKET/LOAD_CARDS_START';
export const LOAD_CARDS_SUCCESS = 'BASKET/LOAD_CARDS_SUCCESS';
export const LOAD_CARDS_ERROR = 'BASKET/LOAD_CARDS_ERROR';

export const SELECT_CARD_START = 'BASKET/SELECT_CARD_START';
export const SELECT_CARD_SUCCESS = 'BASKET/SELECT_CARD_SUCCESS';
export const SELECT_CARD_ERROR = 'BASKET/SELECT_CARD_ERROR';

export const PLACE_ORDER_START = 'BASKET/PLACE_ORDER_START';
export const PLACE_ORDER_SUCCESS = 'BASKET/PLACE_ORDER_SUCCESS';
export const PLACE_ORDER_ERROR = 'BASKET/PLACE_ORDER_ERROR';

export const SELECT_PRODUCT_VARIANT_START = 'BASKET/SELECT_PRODUCT_VARIANT_START';
export const SELECT_PRODUCT_VARIANT_SUCCESS = 'BASKET/SELECT_PRODUCT_VARIANT_SUCCESS';
export const SELECT_PRODUCT_VARIANT_ERROR = 'BASKET/SELECT_PRODUCT_VARIANT_ERROR';

export const SELECT_SHIPMENT_START = 'BASKET/SELECT_SHIPMENT_START';
export const SELECT_SHIPMENT_SUCCESS = 'BASKET/SELECT_SHIPMENT_SUCCESS';
export const SELECT_SHIPMENT_ERROR = 'BASKET/SELECT_SHIPMENT_ERROR';

export const LOAD_EDIT_ADDRESS_DATA = 'BASKET/LOAD_EDIT_ADDRESS_DATA';

export const UPDATE_ADDRESS_START = 'BASKET/UPDATE_ADDRESS_START';
export const UPDATE_ADDRESS_SUCCESS = 'BASKET/UPDATE_ADDRESS_SUCCESS';
export const UPDATE_ADDRESS_ERROR = 'BASKET/UPDATE_ADDRESS_ERROR';

export const REMOVE_ADDRESS_START = 'BASKET/REMOVE_ADDRESS_START';
export const REMOVE_ADDRESS_SUCCESS = 'BASKET/REMOVE_ADDRESS_SUCCESS';
export const REMOVE_ADDRESS_ERROR = 'BASKET/REMOVE_ADDRESS_ERROR';

export const REMOVE_CARD_START = 'BASKET/REMOVE_CARD_START';
export const REMOVE_CARD_SUCCESS = 'BASKET/REMOVE_CARD_SUCCESS';
export const REMOVE_CARD_ERROR = 'BASKET/REMOVE_CARD_ERROR';

// Actions creators
// ////////////////

export const addToBasket = makeUbApiActionCreator(ubApi.addProductToBasket, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR);

export const selectProductVariant = makeUbApiActionCreator(ubApi.updateBasketLine, SELECT_PRODUCT_VARIANT_START, SELECT_PRODUCT_VARIANT_SUCCESS, SELECT_PRODUCT_VARIANT_ERROR);

export const selectShipping = makeUbApiActionCreator(ubApi.updateShipping, SELECT_SHIPMENT_START, SELECT_SHIPMENT_SUCCESS, SELECT_SHIPMENT_ERROR);

export function addToBasketWrapper ({ productId, shipping, variant, variantChild }) {
  return async (dispatch, getState) => {
    try {
      const basketData = await dispatch(addToBasket({ productId }));
      const lineId = basketData.line.id;
      const data = { options: { attributes: { ...variant, ...variantChild } } };
      await dispatch(selectProductVariant({ lineId, data }));
      await dispatch(selectShipping(shipping));
    } catch (error) {
      throw error;
    }
  };
}

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

        const session = JSON.parse(localStorage.getItem('session'));
        session.ubAuthenticationToken = access_token;
        localStorage.setItem('session', JSON.stringify(session));

        await dispatch(updatePersonalInfo({ number, email }));
        await dispatch(loadUbUser());
      }
      return true;
    } catch (error) {
      throw error;
    }
  };
}

export const addNewAddress = makeUbApiActionCreator(ubApi.addAddress, ADD_NEW_ADDRESS_START, ADD_NEW_ADDRESS_SUCCESS, ADD_NEW_ADDRESS_ERROR);

export const loadUserAddresses = makeUbApiActionCreator(ubApi.getUserAddresses, LOAD_UB_USER_ADDRESSES_START, LOAD_UB_USER_ADDRESSES_SUCCESS, LOAD_UB_USER_ADDRESSES_ERROR);

export const selectAddress = makeUbApiActionCreator(ubApi.updateBasket, SELECT_ADDRESS_START, SELECT_ADDRESS_SUCCESS, SELECT_ADDRESS_ERROR);

export const addNewCard = makeUbApiActionCreator(ubApi.addPaymentCard, ADD_NEW_CARD_START, ADD_NEW_CARD_SUCCESS, ADD_NEW_CARD_ERROR);

export const loadCards = makeUbApiActionCreator(ubApi.getPaymentCards, LOAD_CARDS_START, LOAD_CARDS_SUCCESS, LOAD_CARDS_ERROR);

export const selectCard = makeUbApiActionCreator(ubApi.updateBasket, SELECT_CARD_START, SELECT_CARD_SUCCESS, SELECT_CARD_ERROR);

export const placeOrder = makeUbApiActionCreator(ubApi.postOrder, PLACE_ORDER_START, PLACE_ORDER_SUCCESS, PLACE_ORDER_ERROR);

export function loadEditAddressData (data) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_EDIT_ADDRESS_DATA, payload: data });
    } catch (error) {
      throw error;
    }
  };
}

export const updateUserAddress = makeUbApiActionCreator(ubApi.updateAddress, UPDATE_ADDRESS_START, UPDATE_ADDRESS_SUCCESS, UPDATE_ADDRESS_ERROR);

export const removeUserAddress = makeUbApiActionCreator(ubApi.removeAddress, REMOVE_ADDRESS_START, REMOVE_ADDRESS_SUCCESS, REMOVE_ADDRESS_ERROR);

export const removeUserCard = makeUbApiActionCreator(ubApi.removeCard, REMOVE_CARD_START, REMOVE_CARD_SUCCESS, REMOVE_CARD_ERROR);

export function initBasketData () {
  return async (dispatch, getState) => {
    try {
      await dispatch(loadBasketData());
      dispatch(loadUbUser());
      dispatch(loadCards());
      dispatch(loadUserAddresses());
    } catch (error) {
      throw error;
    }
  };
}
