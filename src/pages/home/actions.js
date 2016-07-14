import { fetchMediaRecentlyAdded } from '../../data/actions';

// Action types
// ////////////

export const LOAD_RECENTLY_ADDED = 'HOME/LOAD_RECENTLY_ADDED';
export const LOAD_RECENTLY_ADDED_ERROR = 'HOME/LOAD_RECENTLY_ADDED_ERROR';

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
