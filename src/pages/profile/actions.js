import { currentUserIdSelector } from './selector';
import { fetchUser, fetchWishlistOfUser, fetchSavedScenesOfUser, fetchWishlistsOfUser, fetchWishlistProducts, addWishlistProduct, createWishlist, updateWishlist, removeWishlist, removeWishlistProduct } from '../../data/actions';

export const LOAD_USER = 'LOAD_USER';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';

export const LOAD_SAVED_SCENES_OF_USER = 'LOAD_SAVED_SCENES_OF_USER';
export const LOAD_SAVED_SCENES_OF_USER_ERROR = 'LOAD_SAVED_SCENES_OF_USER_ERROR';

export const LOAD_WISHLISTS_OF_USER = 'LOAD_WISHLISTS_OF_USER';
export const LOAD_WISHLISTS_OF_USER_ERROR = 'LOAD_WISHLISTS_OF_USER_ERROR';

export const LOAD_PRODUCTS_OF_WISHLIST = 'LOAD_PRODUCTS_OF_WISHLIST';
export const LOAD_PRODUCTS_OF_WISHLIST_ERROR = 'LOAD_PRODUCTS_OF_WISHLIST_ERROR';

export const CREATE_WISHLIST_START = 'CREATE_WISHLIST_START';
export const CREATE_WISHLIST_ERROR = 'CREATE_WISHLIST_ERROR';

export const UPDATE_WISHLIST_START = 'UPDATE_WISHLIST_START';
export const UPDATE_WISHLIST_ERROR = 'UPDATE_WISHLIST_ERROR';

export const REMOVE_WISHLIST_START = 'REMOVE_WISHLIST_START';
export const REMOVE_WISHLIST_ERROR = 'REMOVE_WISHLIST_ERROR';

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

export function loadWishlistsOfUser (userId, productUuid = null) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_WISHLISTS_OF_USER, userId });
      return await dispatch(fetchWishlistsOfUser({ userId, page: 0, productUuid }));
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

export function addProductToWishlist (wishlistId, productUuid) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);

    await dispatch(addWishlistProduct({ userId, wishlistId, productUuid }));

    return await dispatch(fetchWishlistsOfUser({ userId, page: 0, productUuid }));
  };
}

export function createNewWishlist (productUuid, wishlistName) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    try {
      dispatch({ type: CREATE_WISHLIST_START });
      await dispatch(createWishlist({ userId, wishlistName }));
      return await dispatch(fetchWishlistsOfUser({ userId, page: 0, productUuid }));
    } catch (error) {
      return dispatch({ error, type: CREATE_WISHLIST_ERROR });
    }
  };
}

export function removeProductFromWishlist (wishlistId, productUuid) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);

    await dispatch(removeWishlistProduct({ userId, wishlistId, productUuid }));

    return await dispatch(fetchWishlistsOfUser({ userId, page: 0, productUuid }));
  };
}

export function updateCurrentWishlist (data) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    try {
      dispatch({ type: UPDATE_WISHLIST_START });
      await dispatch(updateWishlist({ userId, data }));
      return await dispatch(fetchWishlistsOfUser({ userId, page: 0 }));
    } catch (error) {
      return dispatch({ error, type: UPDATE_WISHLIST_ERROR });
    }
  };
}

export function removeCurrentWishlist (wishlistId) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    try {
      dispatch({ type: REMOVE_WISHLIST_START });
      await dispatch(removeWishlist({ userId, wishlistId }));
      return await dispatch(fetchWishlistsOfUser({ userId, page: 0 }));
    } catch (error) {
      return dispatch({ error, type: REMOVE_WISHLIST_ERROR });
    }
  };
}
