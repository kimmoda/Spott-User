import { authenticationTokenSelector, apiBaseUrlSelector, currentLocaleSelector } from '../app/selector';
import * as productApi from '../../api/products';

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
        currentLocaleSelector(state),
        productId
      );
      // Dispatch success
      return dispatch({ type: LOAD_PRODUCT_SUCCESS, productId, data });
    } catch (error) {
      return dispatch({ type: LOAD_PRODUCT_ERROR, productId, error });
    }
  };
}

export const CHANGE_IMAGE_SELECTION = 'CHANGE_IMAGE_SELECTION';
export function changeImageSelection (imageUrl) {
  return { type: CHANGE_IMAGE_SELECTION, imageUrl };
}
