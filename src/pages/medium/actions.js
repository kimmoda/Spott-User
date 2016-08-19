// import { getSeries, getSeasons, getEpisodes, getEpisodeProducts } from '../../api/series';
// import { getRecentlyAddedToWishlist, getPopularProducts } from '../../api/products';
import {
  addSubscriber, fetchMediumScenes, fetchMediumEpisodes, fetchMediumSeasons,
  fetchMediumCharacters, fetchMediumNewScenesForYou, fetchMediumProducts,
  fetchMediumTopUserProducts, fetchMedium, removeSubscriber
} from '../../data/actions';
// import { getMediumCharacters, getMediumProducts } from '../../api/medium';
import { currentUserIdSelector } from '../app/selector';
import { currentMediumSelector } from './selector';

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
    return await dispatch(fetchMedium({ mediumId, mediumType }));
  };
}

export function loadCharacters (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumCharacters({ mediumId }));
  };
}

// Overview
// ////////

export function loadTopProducts (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumProducts({ mediumId }));
  };
}

export function loadTopUserProducts (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumTopUserProducts({ mediumId }));
  };
}

export function loadNewScenesForYou (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumNewScenesForYou({ mediumId }));
  };
}

// Scenes
// //////

export function loadSeasons (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumSeasons({ mediumId }));
  };
}

export function loadEpisodes (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumEpisodes({ mediumId }));
  };
}

export function loadMediumScenes (mediumId) {
  return async (dispatch) => {
    return await dispatch(fetchMediumScenes({ mediumId }));
  };
}
