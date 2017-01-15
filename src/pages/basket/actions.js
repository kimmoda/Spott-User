import { makeUbApiActionCreator } from '../../data/actions';
import * as ubApi from '../../api/ub';

// Action types
// ////////////

export const ADD_PRODUCT_START = 'BASKET/ADD_PRODUCT_START';
export const ADD_PRODUCT_SUCCESS = 'BASKET/ADD_PRODUCT_SUCCESS';
export const ADD_PRODUCT_ERROR = 'BASKET/ADD_PRODUCT_ERROR';

export const LOAD_BASKET_START = 'BASKET/LOAD_BASKET_START';
export const LOAD_BASKET_SUCCESS = 'BASKET/LOAD_BASKET_SUCCESS';
export const LOAD_BASKET_ERROR = 'BASKET/LOAD_BASKET_ERROR';

// Actions creators
// ////////////////

export const addToBasket = makeUbApiActionCreator(ubApi.addProductToBasket, ADD_PRODUCT_START, ADD_PRODUCT_SUCCESS, ADD_PRODUCT_ERROR);

export const loadBasketData = makeUbApiActionCreator(ubApi.loadBasket, LOAD_BASKET_START, LOAD_BASKET_SUCCESS, LOAD_BASKET_ERROR);
