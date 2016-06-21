import { LAZY, ERROR, FETCHING, LOADED, UPDATING } from './statusTypes';
import { Map, List, fromJS } from 'immutable';
import { createSelector } from 'reselect';

// Generic utils
// /////////////

export function slugify (text) {
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars
    .replace(/\-\-+/g, '-') // Replace multiple - with single -
    .replace(/^-+/, '')  // Trim - from start of text
    .replace(/-+$/, ''); // Trim - from end of text
}

// Reducer utils
// /////////////

// path is e.g., [ 'relations', type, id ]
export function fetchStart (state, path) {
  // Get the data (entity/relations) from the state, which can be undefined.
  const data = state.getIn(path);
  // The data is already fetched if the data exist and there is no status.
  const loaded = data && data.get('_status') === LOADED;
  // When the data is already present, set it's status to 'updating'.
  // This way we now if there is already data, but it's updating.
  if (loaded) {
    return state.mergeIn(path, { _status: UPDATING });
  }
  // If the data do not exist, set the status to 'fetching'.
  return state.mergeIn(path, { _status: FETCHING });
}

export function fetchSuccess (state, path, data) {
  return state.setIn(path, fromJS({ ...data, _status: LOADED }));
}

export function fetchError (state, path, error) {
  return state.setIn(path, Map({ _error: error, _status: ERROR }));
}

// Selector utils
// //////////////

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

export function createEntitiesByIdSelector (containerSelector, containerKeySelector) {
  return createSelector(containerSelector, containerKeySelector, (container, containerKey) => {
    // For debugging purposes
    if (!container) {
      console.warn('createEntitiesByIdSelector: container undefined for selector', containerSelector);
      return Map();
    }
    // Get the entry with given id within container
    const entities = container.get(containerKey);
    // If we failed to find the entities, no fetching has started yet.
    if (!entities) {
      return Map({ _status: LAZY, data: List() });
    }
    // Good, we have the entities. Return it, if its there!
    return entities.set('data', entities.get('data') || List());
  });
}
