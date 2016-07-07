import { authenticationTokenSelector, apiBaseUrlSelector } from '../app/selector';
import { currentUserIdSelector } from './selector';
import * as profileApi from '../../data/api/profile';

export const LOAD_USER_START = 'LOAD_USER_START';
export const LOAD_USER_SUCCESS = 'LOAD_USER_SUCCESS';
export const LOAD_USER_ERROR = 'LOAD_USER_ERROR';
export function loadUser (userId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_USER_START, userId });
      const state = getState();
      // Get the currently logged on user
      const data = await profileApi.getUser(
        apiBaseUrlSelector(state),
        authenticationTokenSelector(state),
        userId);
      // Dispatch success
      return dispatch({ type: LOAD_USER_SUCCESS, userId, data });
    } catch (error) {
      console.warn(error.stack);
      return dispatch({ type: LOAD_USER_ERROR, userId, error });
    }
  };
}

export const FETCH_WISHLISTS_OF_USER_START = 'FETCH_WISHLISTS_OF_USER_START';
export const FETCH_WISHLISTS_OF_USER_SUCCESS = 'FETCH_WISHLISTS_OF_USER_SUCCESS';
export const FETCH_WISHLISTS_OF_USER_ERROR = 'FETCH_WISHLISTS_OF_USER_ERROR';
export function fetchWishlistsOfUser (userId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_WISHLISTS_OF_USER_START, userId });
      const state = getState();
      // Get the currently logged on user
      const data = await profileApi.getWishlistsOfUser(
        apiBaseUrlSelector(state),
        authenticationTokenSelector(state),
        userId,
        0);
      // Dispatch success
      return dispatch({ type: FETCH_WISHLISTS_OF_USER_SUCCESS, userId, data });
    } catch (error) {
      return dispatch({ type: FETCH_WISHLISTS_OF_USER_ERROR, userId, error });
    }
  };
}

/**
 * Fetches products in a wishlist of the current user.
 */
export const FETCH_PRODUCTS_OF_WISHLIST_START = 'FETCH_PRODUCTS_OF_WISHLIST_START';
export const FETCH_PRODUCTS_OF_WISHLIST_SUCCESS = 'FETCH_PRODUCTS_OF_WISHLIST_SUCCESS';
export const FETCH_PRODUCTS_OF_WISHLIST_ERROR = 'FETCH_PRODUCTS_OF_WISHLIST_ERROR';
export function fetchProductsOfWishlist (wishlistId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: FETCH_PRODUCTS_OF_WISHLIST_START, wishlistId });
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      const authenticationToken = authenticationTokenSelector(state);
      const userId = currentUserIdSelector(state);
      // Get the wishlist
      const wishlistData = await profileApi.getWishlistOfUser(apiBaseUrl, authenticationToken, userId, wishlistId);
      // Get products of the wishlist
      const productsData = await profileApi.getWishlistProducts(apiBaseUrl, authenticationToken, userId, wishlistId, 0);
      // Dispatch success
      return dispatch({ type: FETCH_PRODUCTS_OF_WISHLIST_SUCCESS, wishlistId, data: {
        ...productsData,
        name: wishlistData.name
      } });
    } catch (error) {
      console.log(error.stack);
      return dispatch({ type: FETCH_PRODUCTS_OF_WISHLIST_ERROR, wishlistId, error });
    }
  };
}
