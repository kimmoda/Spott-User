import { fetchProduct, fetchUbProduct } from '../../data/actions';

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const LOAD_PRODUCT_ERROR = 'LOAD_PRODUCT_ERROR';

export const LOAD_UB_PRODUCT = 'LOAD_UB_PRODUCT';
export const LOAD_UB_PRODUCT_ERROR = 'LOAD_UB_PRODUCT_ERROR';

export const CHANGE_IMAGE_SELECTION = 'CHANGE_IMAGE_SELECTION';

export const CHANGE_UB_PRODUCT_VARIANT = 'CHANGE_UB_PRODUCT_VARIANT';

export function loadProduct (productId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_PRODUCT, productId });
      return await dispatch(fetchProduct({ productId }));
    } catch (error) {
      return dispatch({ type: LOAD_PRODUCT_ERROR, productId, error });
    }
  };
}

export function loadUbProduct (productUrl, productId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_UB_PRODUCT, productUrl, productId });
      return await dispatch(fetchUbProduct({ productUrl, productId }));
    } catch (error) {
      return dispatch({ type: LOAD_UB_PRODUCT_ERROR, productUrl, productId, error });
    }
  };
}

export function changeImageSelection (imageId) {
  return { type: CHANGE_IMAGE_SELECTION, imageId };
}

export function changeUbProductVariant (variant) {
  return { type: CHANGE_UB_PRODUCT_VARIANT, variant };
}
