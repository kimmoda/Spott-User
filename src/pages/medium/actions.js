import {
  addMediumSubscriber, fetchMediumScenes, fetchMediumEpisodes, fetchMediumSeasons,
  fetchMediumCharacters, fetchMediumNewScenesForYou, fetchMediumProducts,
  fetchMediumTopUserProducts, fetchMedium, removeMediumSubscriber
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
