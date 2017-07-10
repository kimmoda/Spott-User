/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
import { fromJS, List, Map } from 'immutable';
import { FETCHING, UPDATING, ERROR, LOADED } from './statusTypes';

function fetchStart (state, path) {
  // Get the data (entity/relations) from the state, which can be undefined.
  const data = state.getIn(path);
  // The data is already fetched if the data exist and there is no status.
  const loaded = data && data.get('_status') === LOADED;
  // When the data is already present, set it's status to 'updating'.
  // This way we now if there is already data, but it's updating.
  if (loaded) {
    return state.mergeIn(path, { _error: null, _status: UPDATING });
  }
  // If the data do not exist, set the status to 'fetching'.
  return state.mergeIn(path, { _error: null, _status: FETCHING });
}

function fetchSuccess (state, path, data) {
  return state.mergeIn(path, fromJS({ ...data, _error: null, _status: LOADED }));
}

function fetchError (state, path, error) {
  return state.setIn(path, Map({ _error: error, _status: ERROR }));
}

function fetchListStart (state, listKey) {
  return fetchStart(state, [ 'lists', listKey ]);
}
function fetchListSuccess (state, listKey, entitiesKey, data) {
  // data.forEach((item) => item._status = LOADED); // Add _status 'loaded' to each fetched entity.
  return state
    .mergeDeepIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      next._status = LOADED;
      next._error = null;
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'lists', listKey ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}
function fetchListError (state, listKey, error) {
  return fetchError(state, [ 'lists', listKey ], error);
}

function fetchRelationsStart (state, relationsKey, relationEntryKey) {
  return fetchStart(state, [ 'relations', relationsKey, relationEntryKey ]);
}
function fetchRelationsSuccess (state, relationsKey, relationEntryKey, entitiesKey, data) {
  return state
    .mergeDeepIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      next._status = LOADED; // Add _status 'loaded' to each fetched entity.
      next._error = null;
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'relations', relationsKey, relationEntryKey ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}
function fetchRelationsError (state, relationsKey, relationEntryKey, error) {
  return fetchError(state, [ 'relations', relationsKey, relationEntryKey ], error);
}

