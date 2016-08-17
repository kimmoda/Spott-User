// import { getSeries, getSeasons, getEpisodes, getEpisodeProducts } from '../../api/series';
// import { getRecentlyAddedToWishlist, getPopularProducts } from '../../api/products';
import { addSubscriber, fetchMediumSeasons, fetchMediumCharacters, fetchMediumNewScenesForYou, fetchMediumProducts, fetchMediumTopUserProducts, fetchMedium, removeSubscriber } from '../../data/actions';
// import { getMediumCharacters, getMediumProducts } from '../../api/medium';
import { currentUserIdSelector } from '../app/selector';
import { currentMediumSelector } from './selector';

export const LOAD_MEDIUM = 'SERIES/LOAD_MEDIUM';
export const LOAD_MEDIUM_ERROR = 'SERIES/LOAD_MEDIUM_ERROR';

export const LOAD_SEASONS = 'SERIES/LOAD_SEASONS';
export const LOAD_SEASONS_ERROR = 'SERIES/LOAD_SEASONS_ERROR';

export const LOAD_MEDIUM_CHARACTERS = 'SERIES/LOAD_MEDIUM_CHARACTERS';
export const LOAD_MEDIUM_CHARACTERS_ERROR = 'SERIES/LOAD_MEDIUM_CHARACTERS_ERROR';

export const LOAD_MEDIUM_TOP_PRODUCTS = 'SERIES/LOAD_MEDIUM_TOP_PRODUCTS';
export const LOAD_MEDIUM_TOP_PRODUCTS_ERROR = 'SERIES/LOAD_MEDIUM_TOP_PRODUCTS_ERROR';

export const LOAD_MEDIUM_TOP_USER_PRODUCTS = 'SERIES/LOAD_MEDIUM_TOP_USER_PRODUCTS';
export const LOAD_MEDIUM_TOP_USER_PRODUCTS_ERROR = 'SERIES/LOAD_MEDIUM_TOP_USER_PRODUCTS_ERROR';

export const LOAD_NEW_SCENES_FOR_YOU = 'SERIES/LOAD_NEW_SCENES_FOR_YOU';
export const LOAD_NEW_SCENES_FOR_YOU_ERROR = 'SERIES/LOAD_NEW_SCENES_FOR_YOU_ERROR';

// Hero
// ////

// 4adb58ee-0801-45fa-b6f6-e1dc628e5d48 userId
export function toggleFollow () {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    const medium = currentMediumSelector(state);

    if (medium.get('subscribed')) {
      await dispatch(removeSubscriber({ mediumId: medium.get('id'), userId }));
    } else {
      await dispatch(addSubscriber({ mediumId: medium.get('id'), userId }));
    }
    //  // seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed'
    // const episodes = await getEpisodes(apiBaseUrlSelector(state), authenticationTokenSelector(state), { seasonId: '05f90d72-cf44-4686-82be-d0df3ea5a4ed' });
    // const products = await getEpisodeProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { episodeId: '83292a01-e3f8-42dd-95dc-f899407c1544' });
    // const products = await getRecentlyAddedToWishlist(apiBaseUrlSelector(state), authenticationTokenSelector(state), { userId: currentUserIdSelector(state) });
    // const products = await getPopularProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state));
    // const products = await getMediumProducts(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
    // const products = await getMediumCharacters(apiBaseUrlSelector(state), authenticationTokenSelector(state), { mediumId: '618dd390-4f5a-4f4e-a482-c3c1a73caee7' });
    return await dispatch(fetchMedium({ mediumId: medium.get('id'), mediumType: medium.get('type') }));
  };
}

export function loadMedium (mediumType, mediumId) {
  return async (dispatch, getState) => {
    try {
      dispatch({ mediumId, mediumType, type: LOAD_MEDIUM });
      return await dispatch(fetchMedium({ mediumId, mediumType }));
    } catch (error) {
      return dispatch({ error, mediumId, mediumType, type: LOAD_MEDIUM_ERROR });
    }
  };
}

export function loadCharacters (mediumId) {
  return async (dispatch) => {
    try {
      dispatch({ mediumId, type: LOAD_MEDIUM_CHARACTERS });
      return await dispatch(fetchMediumCharacters({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_MEDIUM_CHARACTERS_ERROR });
    }
  };
}

// Overview
// ////////

export function loadTopProducts (mediumId) {
  return async (dispatch) => {
    try {
      dispatch({ mediumId, type: LOAD_MEDIUM_TOP_PRODUCTS });
      return await dispatch(fetchMediumProducts({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_MEDIUM_TOP_PRODUCTS_ERROR });
    }
  };
}

export function loadTopUserProducts (mediumId) {
  return async (dispatch) => {
    try {
      dispatch({ mediumId, type: LOAD_MEDIUM_TOP_USER_PRODUCTS });
      return await dispatch(fetchMediumTopUserProducts({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_MEDIUM_TOP_USER_PRODUCTS_ERROR });
    }
  };
}

export function loadNewScenesForYou (mediumId) {
  return async (dispatch) => {
    try {
      dispatch({ mediumId, type: LOAD_NEW_SCENES_FOR_YOU });
      return await dispatch(fetchMediumNewScenesForYou({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_NEW_SCENES_FOR_YOU_ERROR });
    }
  };
}

// Scenes
// //////

export function loadSeasons (mediumId) {
  return async (dispatch) => {
    try {
      dispatch({ mediumId, type: LOAD_SEASONS });
      return await dispatch(fetchMediumSeasons({ mediumId }));
    } catch (error) {
      return dispatch({ error, mediumId, type: LOAD_SEASONS_ERROR });
    }
  };
}
