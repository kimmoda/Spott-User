import { ERROR, FETCHING, LOADED, UPDATING } from '../statusTypes';
import { Map, fromJS } from 'immutable';

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
