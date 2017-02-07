import { fetchPopularSeries, fetchNewEpisodes, fetchMediaRecentlyAdded, fetchPopularProducts, fetchNewScenesForYou, fetchProductsRecentlyAddedToWishlist, fetchTvGuideEntries, makeApiActionCreator } from '../../data/actions';
import { currentUserIdSelector } from '../app/selector';
import * as searchApi from '../../api/search';

// Action types
// ////////////

export const LOAD_RECENTLY_ADDED = 'HOME/LOAD_RECENTLY_ADDED';
export const LOAD_RECENTLY_ADDED_ERROR = 'HOME/LOAD_RECENTLY_ADDED_ERROR';
export const LOAD_RECENTLY_ADDED_TO_WISHLIST = 'HOME/LOAD_RECENTLY_ADDED_TO_WISHLIST';
export const LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR = 'HOME/LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR';
export const LOAD_POPULAR_PRODUCTS = 'HOME/LOAD_POPULAR_PRODUCTS';
export const LOAD_POPULAR_PRODUCTS_ERROR = 'HOME/LOAD_POPULAR_PRODUCTS_ERROR';
export const LOAD_NEW_SCENES_FOR_YOU = 'HOME/LOAD_NEW_SCENES_FOR_YOU';
export const LOAD_NEW_SCENES_FOR_YOU_ERROR = 'HOME/LOAD_NEW_SCENES_FOR_YOU_ERROR';
export const LOAD_NEW_EPISODES = 'HOME/LOAD_NEW_EPISODES';
export const LOAD_NEW_EPISODES_ERROR = 'HOME/LOAD_NEW_EPISODES_ERROR';
export const LOAD_POPULAR_SERIES = 'HOME/LOAD_POPULAR_SERIES';
export const LOAD_POPULAR_SERIES_ERROR = 'HOME/LOAD_POPULAR_SERIES_ERROR';
export const LOAD_TV_GUIDE_ENTRIES_ERROR = 'HOME/LOAD_TV_GUIDE_FETCH_ERROR';

export const SEARCH_SUGGESTIONS_FETCH_START = 'HOME/SEARCH_SUGGESTIONS_FETCH_START';
export const SEARCH_SUGGESTIONS_FETCH_SUCCESS = 'HOME/SEARCH_SUGGESTIONS_FETCH_SUCCESS';
export const SEARCH_SUGGESTIONS_FETCH_ERROR = 'HOME/SEARCH_SUGGESTIONS_FETCH_ERROR';
export const SEARCH_SUGGESTIONS_CLEAR = 'HOME/SEARCH_SUGGESTIONS_CLEAR';

// Actions creators
// ////////////////

export function loadTvGuideEntries () {
  return async (dispatch, getState) => {
    try {
      return await dispatch(fetchTvGuideEntries());
    } catch (error) {
      dispatch({ error, type: LOAD_TV_GUIDE_ENTRIES_ERROR });
    }
  };
}

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
      dispatch({ type: LOAD_RECENTLY_ADDED_TO_WISHLIST });
      return await dispatch(fetchProductsRecentlyAddedToWishlist({ userId }));
    } catch (error) {
      dispatch({ error, type: LOAD_RECENTLY_ADDED_TO_WISHLIST_ERROR });
    }
  };
}

export function loadPopularProducts () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_POPULAR_PRODUCTS });
      return await dispatch(fetchPopularProducts());
    } catch (error) {
      dispatch({ error, type: LOAD_POPULAR_PRODUCTS_ERROR });
    }
  };
}

export function loadNewScenesForYou () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_NEW_SCENES_FOR_YOU });
      const state = getState();
      const userId = currentUserIdSelector(state);
      return await dispatch(fetchNewScenesForYou({ userId }));
    } catch (error) {
      dispatch({ error, type: LOAD_NEW_SCENES_FOR_YOU_ERROR });
    }
  };
}

export function loadNewEpisodes () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_NEW_EPISODES });
      return await dispatch(fetchNewEpisodes());
    } catch (error) {
      dispatch({ error, type: LOAD_NEW_EPISODES_ERROR });
    }
  };
}

export function loadPopularSeries () {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: LOAD_POPULAR_SERIES });
      return await dispatch(fetchPopularSeries());
    } catch (error) {
      dispatch({ error, type: LOAD_POPULAR_SERIES_ERROR });
    }
  };
}

// Load the data sequentially in the order of the blocks are displayed.
export function loadUserData () {
  return async (dispatch, getState) => {
    await dispatch(loadNewScenesForYou());
    await dispatch(loadRecentlyAddedToWishlist());
  };
}

// Load the data sequentially in the order of the blocks are displayed.
export function load () {
  return async (dispatch, getState) => {
    await dispatch(loadRecentlyAdded());
    await dispatch(loadTvGuideEntries());
    await dispatch(loadNewEpisodes());
    await dispatch(loadPopularProducts());
    // Top selling products exist out of popular series, which have top products.
    // The products are fetched when the component is mounted.
    await dispatch(loadPopularSeries());
  };
}

export const getSearchSuggestions = makeApiActionCreator(searchApi.getSearchSuggestions, SEARCH_SUGGESTIONS_FETCH_START, SEARCH_SUGGESTIONS_FETCH_SUCCESS, SEARCH_SUGGESTIONS_FETCH_ERROR);

export function clearSearchSuggestions () {
  return (dispatch, getState) => {
    dispatch({ type: SEARCH_SUGGESTIONS_CLEAR });
  };
}
