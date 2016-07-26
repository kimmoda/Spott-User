import { fetchProduct } from '../../data/actions';

export const LOAD_PRODUCT = 'LOAD_PRODUCT';
export const LOAD_PRODUCT_ERROR = 'LOAD_PRODUCT_ERROR';

export const CHANGE_IMAGE_SELECTION = 'CHANGE_IMAGE_SELECTION';

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

export function changeImageSelection (imageId) {
  return { type: CHANGE_IMAGE_SELECTION, imageId };
}
