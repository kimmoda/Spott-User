import {
  addMediumSubscriber, fetchMediumScenes, fetchMediumEpisodes, fetchMediumSeasons,
  fetchMediumCharacters, fetchMediumNewScenesForYou, fetchMediumProducts,
  fetchMediumTopUserProducts, fetchMediumTopProducts, fetchMedium, removeMediumSubscriber
} from '../../data/actions';
import { currentUserIdSelector } from '../app/selector';
import { currentMediumSelector } from './selector';

// Hero
// ////

export function toggleFollow (mediumId) {
  return async (dispatch, getState) => {
    const state = getState();
    const userId = currentUserIdSelector(state);
    const medium = currentMediumSelector(state, { mediumId });

    if (medium.get('subscribed')) {
      await dispatch(removeMediumSubscriber({ mediumId: medium.get('id'), mediumType: medium.get('type'), userId }));
    } else {
      await dispatch(addMediumSubscriber({ mediumId: medium.get('id'), mediumType: medium.get('type'), userId }));
    }

    return await dispatch(fetchMedium({ mediumId: medium.get('id'), mediumType: medium.get('type') }));
  };
}

export function loadMedium (mediumType, mediumId) {
  return fetchMedium({ mediumId, mediumType });
}

export function loadCharacters (mediumId) {
  return fetchMediumCharacters({ mediumId });
}

// Overview
// ////////

export function loadTopProducts (mediumId) {
  return fetchMediumTopProducts({ mediumId });
}

export function loadTopUserProducts (mediumId) {
  return fetchMediumTopUserProducts({ mediumId });
}

export function loadNewScenesForYou (mediumId) {
  return fetchMediumNewScenesForYou({ mediumId });
}

// Scenes
// //////

export function loadSeasons (mediumId) {
  return fetchMediumSeasons({ mediumId });
}

export function loadEpisodes (mediumId) {
  return fetchMediumEpisodes({ mediumId });
}

export function loadMediumScenes (mediumId) {
  return fetchMediumScenes({ mediumId });
}

// Products
// ////////

export function loadMediumProducts (mediumId) {
  return fetchMediumProducts({ mediumId });
}
