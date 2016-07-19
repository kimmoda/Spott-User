import { fetchMediaRecentlyAdded, fetchProductsRecentlyAddedToWishlist } from '../../data/actions';
import { currentUserIdSelector } from '../app/selector';

// Action types
// ////////////

export const LOAD_RECENTLY_ADDED = 'HOME/LOAD_RECENTLY_ADDED';
export const LOAD_RECENTLY_ADDED_ERROR = 'HOME/LOAD_RECENTLY_ADDED_ERROR';
export const LOAD_RECENTLY_ADDED_TO_WISHLIST = 'HOME/LOAD_RECENTLY_ADDED_TO_WISHLIST';
export const LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR = 'HOME/LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR';

// Actions creators
// ////////////////

export function loadRecentlyAdded () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_RECENTLY_ADDED });
      return await dispatch(fetchMediaRecentlyAdded());
    } catch (error) {
      dispatch({ error, type: LOAD_RECENTLY_ADDED_ERROR });
    }
  };
}

export function loadRecentlyAddedToWishlist () {
  return async (dispatch, getState) => {
    try {
      const state = getState();
      const userId = currentUserIdSelector(state);
      if (userId) {
        dispatch({ type: LOAD_RECENTLY_ADDED_TO_WISHLIST });
        return await dispatch(fetchProductsRecentlyAddedToWishlist({ userId }));
      }
    } catch (error) {
      dispatch({ error, type: LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR });
    }
  };
}
