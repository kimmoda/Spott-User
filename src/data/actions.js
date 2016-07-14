import * as mediaApi from '../api/media';

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

// Actors

export const MEDIA_RECENTLY_ADDED_FETCH_START = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_START';
export const MEDIA_RECENTLY_ADDED_FETCH_SUCCESS = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_SUCCESS';
export const MEDIA_RECENTLY_ADDED_FETCH_ERROR = 'DATA/MEDIA_RECENTLY_ADDED_FETCH_ERROR';

// Actions creators
// ////////////////

// Actors

export const fetchMediaRecentlyAdded = makeApiActionCreator(mediaApi.getRecentlyAdded, MEDIA_RECENTLY_ADDED_FETCH_START, MEDIA_RECENTLY_ADDED_FETCH_SUCCESS, MEDIA_RECENTLY_ADDED_FETCH_ERROR);
