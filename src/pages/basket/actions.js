import { makeUbApiActionCreator } from '../../data/actions';
import * as ubApi from '../../api/ub';

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

// Actions creators
// ////////////////

export const addToBasket = makeUbApiActionCreator(ubApi.addProductToBasket, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR);

export const removeFromBasket = makeUbApiActionCreator(ubApi.removeProductFromBasket, REMOVE_PRODUCT_START, REMOVE_PRODUCT_SUCCESS, REMOVE_PRODUCT_ERROR);

export const loadBasketData = makeUbApiActionCreator(ubApi.loadBasket, LOAD_BASKET_START, LOAD_BASKET_SUCCESS, LOAD_BASKET_ERROR);

export const loadNewUbToken = makeUbApiActionCreator(ubApi.getNewUbToken, GET_UB_TOKEN_START, GET_UB_TOKEN_SUCCESS, GET_UB_TOKEN_ERROR);

export const loadUbToken = makeUbApiActionCreator(ubApi.geUbToken, LOAD_UB_TOKEN_START, LOAD_UB_TOKEN_SUCCESS, LOAD_UB_TOKEN_ERROR);

export const setUbToken = makeUbApiActionCreator(ubApi.setUbToken, SET_UB_TOKEN_START, SET_UB_TOKEN_SUCCESS, SET_UB_TOKEN_ERROR);

// @TODO in progress
export async function initUbToken (userId) {
  return async (dispatch, getState) => {
    try {
      const ubToken = await loadUbToken({ userId });
      if (!ubToken) {
        const newUbToken = await dispatch(loadNewUbToken());
        return await dispatch(setUbToken({ userId, ubToken: newUbToken }));
      }
    } catch (error) {
      throw error;
    }
  };
}
