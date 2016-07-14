import { List, Map } from 'immutable';
import { createSelector } from 'reselect';
import { LAZY } from './statusTypes';

// Entities selectors
export const actorsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'actors' ]);
export const appearancesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'appearances' ]);
export const brandsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'brands' ]);
export const commercialsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'commercials' ]);
export const charactersEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'characters' ]);
export const characterFacesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'characterFaces' ]);
export const episodesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'episodes' ]);
export const feedPostsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'feedPosts' ]);
export const mediumCategoriesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'mediumCategories' ]);
export const moviesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'movies' ]);
export const platformsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'platforms' ]);
export const processRequestLogsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'processRequestLogs' ]);
export const processRequestsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'processRequests' ]);
export const productCategoriesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'productCategories' ]);
export const productOfferingsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'productOfferings' ]);
export const productsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'products' ]);
export const pushesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'pushes' ]);
export const scenesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'scenes' ]);
export const seasonsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'seasons' ]);
export const seriesEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'series' ]);
export const shopsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'shops' ]);
export const tagsEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'tags' ]);
export const videosEntitiesSelector = (state) => state.getIn([ 'data', 'entities', 'videos' ]);

// Relations selectors
export const filterHasBrandsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'filterHasBrands' ]);
export const filterHasProductsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'filterHasProducts' ]);
export const filterHasPushesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'filterHasPushes' ]);
export const mediumHasFeedPostsSelector = (state) => state.getIn([ 'data', 'relations', 'mediumHasFeedPosts' ]);
export const pageHasCharacterFacesRelationsSelectorFactory = (characterIdSelector) => (state) => {
  const relation = state.getIn([ 'data', 'relations', 'characterIdHasFacePages', characterIdSelector(state) ]);
  // If no relation exists return an empty list and _status: LAZY to make sure enclosing selectors don't crash
  if (!relation) {
    return Map({ _status: LAZY, data: List() });
  }
  return relation;
};
export const pageHasMediumCategoriesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'pageHasMediumCategories' ]);
export const pageHasPlatformsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'pageHasPlatforms' ]);
export const pageHasProcessRequestsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'pageHasProcessRequests' ]);
export const pageHasProductCategoriesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'pageHasProductCategories' ]);
export const pageHasTagsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'pageHasTags' ]);
export const productHasOfferingsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'productHasOfferings' ]);
export const productHasSimilarProductsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'productHasSimilarProducts' ]);
export const productImageHasProductSuggestionsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'productImageHasProductSuggestions' ]);
export const sceneHasProductsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'sceneHasProducts' ]);
export const searchStringHasActorsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasActors' ]);
export const searchStringHasBrandsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasBrands' ]);
export const searchStringHasCharactersRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasCharacters' ]);
export const searchStringHasMediumCategoriesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasMediumCategories' ]);
export const searchStringHasPlatformsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasPlatforms' ]);
export const searchStringHasProductCategoriesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasProductCategories' ]);
export const searchStringHasProductsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasProducts' ]);
export const searchStringHasSeriesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasSeries' ]);
export const searchStringHasShopsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasShops' ]);
export const searchStringHasTagsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'searchStringHasTags' ]);
export const seriesFilterHasSeasonsRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'seriesFilterHasSeasons' ]);
export const videoHasScenesRelationsSelector = (state) => state.getIn([ 'data', 'relations', 'videoHasScenes' ]);

/**
 * Utility selector factory for accessing related id's.
 *
 * Creates a selector for selecting id's for the entry specified by relationEntryKey within the given relation.
 * @param {function} relationSelector
 * @param {function} relationEntryKeySelector
 * @return {Map} An immutable map with a '_status' and 'data':
 *   The field _status can contain any of the predefined status types (see /constants/statusTypes.js),
 *   the field data is an immutable list containing the entity ids.
 *   Both elements are always present.
 */
export function createEntityIdsByRelationSelector (relationSelector, relationEntryKeySelector) {
  return createSelector(relationSelector, relationEntryKeySelector, (relation, relationEntryKey) => {
    // Get the entry in the relation, being a Map({ <relationEntryKey>: Map({ _status, _error, data }) })
    const relationEntry = relation.get(relationEntryKey);
    // If we did not found such an entry, no fetching has started yet.
    if (!relationEntry) {
      return Map({ _status: LAZY, data: List() });
    }
    // Good, we have a relation. Get its data (a list of id's, if already there)
    return relationEntry.set('data', relationEntry.get('data') || List()); // Ensure we always have a list in 'data'.
  });
}

/**
 * Utility selector factory for accessing related entities.
 *
 * Creates a selector for selecting entities for the entry specified by relationEntryKey within the given relation.
 * @param {function} relationSelector
 * @param {function} relationEntryKeySelector
 * @param {function} entitiesByIdSelector
 * @return {Map} An immutable map with a '_status' and 'data':
 *   The field _status can contain any of the predefined status types (see /constants/statusTypes.js),
 *   the field data is an immutable list containing the entities.
 *   Both elements are always present.
 */
export function createEntitiesByRelationSelector (relationSelector, relationEntryKeySelector, entitiesByIdSelector) {
  return createSelector(entitiesByIdSelector, createEntityIdsByRelationSelector(relationSelector, relationEntryKeySelector), (entitiesById, relation) => {
    // Good, we have a relation. Map over its data (a list of id's, if already there) and substitute by the entities.
    return relation.set('data', relation.get('data').map((id) => entitiesById.get(id)));
  });
}

/**
 * Utility selector factory for accessing an entity by id.
 *
 * Creates a selector for the entity with given id's within the given entities.
 * @param {function} entitiesSelector
 * @param {function} entityKeySelector
 * @return {Map} An immutable map with a '_status' and 'data':
 *   The field _status can contain any of the predefined status types (see /constants/statusTypes.js),
 *   the field data is an immutable list containing the entity ids.
 *   Both elements are always present.
 */
export function createEntityByIdSelector (entitiesSelector, entityKeySelector) {
  return createSelector(entitiesSelector, entityKeySelector, (entities, entityKey) => {
    // For debugging purposes
    if (!entities) {
      console.warn('createEntityByIdSelector: entities undefined for selector', entitiesSelector);
      return Map();
    }
    // Get the entity with given id within entities, being a Map({ <entityKey>: Map({ _status, _error, ...data }) })
    const entity = entities.get(entityKey);
    // If we failed to find the entity, no fetching has started yet.
    if (!entity) {
      return Map({ _status: LAZY });
    }
    // Good, we have an entity. Return it!
    return entity;
  });
}
