import { createStructuredSelector } from 'reselect';
import { isAuthenticatedSelector } from '../app/selector';
import {
  createEntityByIdSelector, createEntitiesByRelationSelector,
  charactersEntitiesSelector, mediaEntitiesSelector,
  mediumHasNewScenesForYouSelector, mediumHasEpisodesSelector,
  scenesEntitiesSelector, mediumHasCharactersSelector, mediumHasScenesSelector,
  mediumHasSeasonsSelector, mediumHasTopProductsSelector, mediumHasProductsSelector, mediumHasTopUserProductsSelector, productsEntitiesSelector
} from '../../data/selector';
import mostSpecificMedium from './_mostSpecificMedium';

const currentMediumIdSelector = (state, props) => (props.params && props.params.mediumId) || props.mediumId;
export const currentMediumSelector = createEntityByIdSelector(mediaEntitiesSelector, currentMediumIdSelector);

// Hero

export const heroSelector = createStructuredSelector({
  characters: createEntitiesByRelationSelector(mediumHasCharactersSelector, currentMediumIdSelector, charactersEntitiesSelector),
  isAuthenticated: isAuthenticatedSelector,
  medium: currentMediumSelector
});

export const tabsSelector = createStructuredSelector({
  medium: currentMediumSelector
});

// Overview

export const pickedForYouSelector = createStructuredSelector({
  products: createEntitiesByRelationSelector(mediumHasTopUserProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});

export const topProductsSelector = createStructuredSelector({
  medium: currentMediumSelector,
  products: createEntitiesByRelationSelector(mediumHasTopProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});

export const newScenesForYouSelector = createStructuredSelector({
  scenes: createEntitiesByRelationSelector(mediumHasNewScenesForYouSelector, currentMediumIdSelector, scenesEntitiesSelector)
});

// Scenes

export const seasonsSelector = createStructuredSelector({
  seasons: createEntitiesByRelationSelector(mediumHasSeasonsSelector, currentMediumIdSelector, mediaEntitiesSelector)
});

const currentSeasonIdSelector = (state, props) => (props.params && props.params.seasonId) || props.seasonId;
export const episodesSelector = createStructuredSelector({
  episodes: createEntitiesByRelationSelector(mediumHasEpisodesSelector, currentSeasonIdSelector, mediaEntitiesSelector)
});

const currentEpisodeIdSelector = (state, props) => props.params && props.params.episodeId;
const currentScenesMediumIdSelector = (state, props) => mostSpecificMedium(props);
export const scenesSelector = createStructuredSelector({
  currentScenesMediumId: currentScenesMediumIdSelector,
  episode: createEntityByIdSelector(mediaEntitiesSelector, currentEpisodeIdSelector),
  medium: currentMediumSelector,
  scenes: createEntitiesByRelationSelector(mediumHasScenesSelector, currentScenesMediumIdSelector, scenesEntitiesSelector)
});

export const mediumProductsSelector = createStructuredSelector({
  products: createEntitiesByRelationSelector(mediumHasProductsSelector, currentMediumIdSelector, productsEntitiesSelector)
});
