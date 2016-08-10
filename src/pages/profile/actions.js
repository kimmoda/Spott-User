import { currentUserIdSelector } from './selector';
import { fetchUser, fetchWishlistOfUser, fetchSavedScenesOfUser, fetchWishlistsOfUser, fetchWishlistProducts } from '../../data/actions';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';

export const LOAD_SAVED_SCENES_OF_USER = 'LOAD_SAVED_SCENES_OF_USER';
export const LOAD_SAVED_SCENES_OF_USER_ERROR = 'LOAD_SAVED_SCENES_OF_USER_ERROR';

export const LOAD_WISHLISTS_OF_USER = 'LOAD_WISHLISTS_OF_USER';
export const LOAD_WISHLISTS_OF_USER_ERROR = 'LOAD_WISHLISTS_OF_USER_ERROR';

export const LOAD_PRODUCTS_OF_WISHLIST = 'LOAD_PRODUCTS_OF_WISHLIST';
export const LOAD_PRODUCTS_OF_WISHLIST_ERROR = 'LOAD_PRODUCTS_OF_WISHLIST_ERROR';

export function loadUser (userId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_USER, userId });
      return await dispatch(fetchUser({ userId }));
    } catch (error) {
      return dispatch({ error, type: LOAD_USER_ERROR, userId });
    }
  };
}

export function loadSavedScenesOfUser (userId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_SAVED_SCENES_OF_USER, userId });
      return await dispatch(fetchSavedScenesOfUser({ userId, page: 0 }));
    } catch (error) {
      return dispatch({ error, type: LOAD_SAVED_SCENES_OF_USER_ERROR, userId });
    }
  };
}

export function loadWishlistsOfUser (userId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_WISHLISTS_OF_USER, userId });
      return await dispatch(fetchWishlistsOfUser({ userId, page: 0 }));
    } catch (error) {
      return dispatch({ error, type: LOAD_WISHLISTS_OF_USER_ERROR, userId });
    }
  };
}

/**
 * Fetches products in a wishlist of the current user.
 */
export function loadProductsOfWishlist (wishlistId) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);

    try {
      dispatch({ type: LOAD_PRODUCTS_OF_WISHLIST, userId, wishlistId });
      // Get the wishlist
      await dispatch(fetchWishlistOfUser({ userId, wishlistId }));
      // Get products of the wishlist
      await dispatch(fetchWishlistProducts({ page: 0, userId, wishlistId }));
    } catch (error) {
      return dispatch({ error, type: LOAD_PRODUCTS_OF_WISHLIST_ERROR, userId, wishlistId });
    }
  };
}
