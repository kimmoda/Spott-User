import * as mediaApi from '../api/media';
import * as productsApi from '../api/products';

import { authenticationTokenSelector, apiBaseUrlSelector } from '../pages/app/selector';

export function makeApiActionCreator (_apiCall, startActionType, successActionType, errorActionType) {
  return function (params) {
    return async (dispatch, getState) => {
      const state = getState();
      const apiBaseUrl = apiBaseUrlSelector(state);
      const authenticationToken = authenticationTokenSelector(state);
      dispatch({ ...params, type: startActionType });
      try {
        const data = await _apiCall(apiBaseUrl, authenticationToken, params);
        dispatch({ ...params, data, type: successActionType });
        return data;
      } catch (error) {
        dispatch({ ...params, error, type: errorActionType });
        throw error;
      }
    };
  };
}

// Action types
// ////////////

export const MEDIA_RECENTLY_ADDED_FETCH_START = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_START';
export const MEDIA_RECENTLY_ADDED_FETCH_SUCCESS = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_SUCCESS';
export const MEDIA_RECENTLY_ADDED_FETCH_ERROR = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_ERROR';

export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START';
export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS';
export const PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR = 'DATA/PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR';

export const POPULAR_PRODUCTS_FETCH_START = 'DATA/POPULAR_PRODUCTS_FETCH_START';
export const POPULAR_PRODUCTS_FETCH_SUCCESS = 'DATA/POPULAR_PRODUCTS_FETCH_SUCCESS';
export const POPULAR_PRODUCTS_FETCH_ERROR = 'DATA/POPULAR_PRODUCTS_FETCH_ERROR';

// Actions creators
// ////////////////

export const fetchMediaRecentlyAdded = makeApiActionCreator(mediaApi.getRecentlyAdded, MEDIA_RECENTLY_ADDED_FETCH_START, MEDIA_RECENTLY_ADDED_FETCH_SUCCESS, MEDIA_RECENTLY_ADDED_FETCH_ERROR);

export const fetchProductsRecentlyAddedToWishlist = makeApiActionCreator(productsApi.getRecentlyAddedToWishlist, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS, PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR);

export const fetchPopularProducts = makeApiActionCreator(productsApi.getPopularProducts, POPULAR_PRODUCTS_FETCH_START, POPULAR_PRODUCTS_FETCH_SUCCESS, POPULAR_PRODUCTS_FETCH_ERROR);
