import { authenticationTokenSelector, apiBaseUrlSelector } from '../../selectors';
import * as productApi from './api';

export const LOAD_PRODUCT_START = 'LOAD_PRODUCT_START';
export const LOAD_PRODUCT_SUCCESS = 'LOAD_PRODUCT_SUCCESS';
export const LOAD_PRODUCT_ERROR = 'LOAD_PRODUCT_ERROR';
export function loadProduct (productId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_PRODUCT_START, productId });
      const state = getState();
      // Get the currently logged on user
      const data = await productApi.getProduct(
        apiBaseUrlSelector(state),
        authenticationTokenSelector(state),
        productId);
      // Dispatch success
      return dispatch({ type: LOAD_PRODUCT_SUCCESS, productId, data });
    } catch (error) {
      return dispatch({ type: LOAD_PRODUCT_ERROR, productId, error });
    }
  };
}
