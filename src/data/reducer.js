/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
import { fromJS, List, Map } from 'immutable';
import * as actions from './actions';
import { FETCHING, UPDATING, ERROR, LOADED } from './statusTypes';

function fetchStart (state, path) {
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
/* TODO: not used yet.
function fetchSuccess (state, path, data) {
  return state.setIn(path, fromJS({ ...data, _status: LOADED }));
}
*/
function fetchError (state, path, error) {
  return state.setIn(path, Map({ _error: error, _status: ERROR }));
}

function fetchListStart (state, listKey) {
  return fetchStart(state, [ 'lists', listKey ]);
}
function fetchListSuccess (state, listKey, entitiesKey, data) {
  data.forEach((item) => item._status = LOADED); // Add _status 'loaded' to each fetched entity.
  return state
    .mergeIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'lists', listKey ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}
function fetchListError (state, listKey, error) {
  return fetchError(state, [ 'lists', listKey ], error);
}

/**
  * data
  * -> entities
  *    -> media
  *    -> products
  * -> relations
  *    -> empty
  * -> lists
  *    -> recentlyAddedMedia
  *    -> recentlyAddedToWishlistProducts
  */
export default (state = fromJS({
  entities: {
    media: {},
    products: {}
  },
  relations: {
  },
  lists: {
    popularProducts: {},
    recentlyAddedMedia: {},
    recentlyAddedToWishlistProducts: {}
  }
}), action) => {
  switch (action.type) {

    // Media
    // /////

    case actions.MEDIA_RECENTLY_ADDED_FETCH_START:
      return fetchListStart(state, 'recentlyAddedMedia');
    case actions.MEDIA_RECENTLY_ADDED_FETCH_SUCCESS:
      return fetchListSuccess(state, 'recentlyAddedMedia', 'media', action.data);
    case actions.MEDIA_RECENTLY_ADDED_FETCH_ERROR:
      return fetchListError(state, 'recentlyAddedMedia', action.error);

    // Products
    // ////////

    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_START:
      return fetchListStart(state, 'recentlyAddedToWishlistProducts');
    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_SUCCESS:
      return fetchListSuccess(state, 'recentlyAddedToWishlistProducts', 'products', action.data);
    case actions.PRODUCTS_RECENTLY_ADDED_TO_WISHLIST_FETCH_ERROR:
      return fetchListError(state, 'recentlyAddedToWishlistProducts', action.error);

    case actions.POPULAR_PRODUCTS_FETCH_START:
      return fetchListStart(state, 'popularProducts');
    case actions.POPULAR_PRODUCTS_FETCH_SUCCESS:
      return fetchListSuccess(state, 'popularProducts', 'products', action.data);
    case actions.POPULAR_PRODUCTS_FETCH_ERROR:
      return fetchListError(state, 'popularProducts', action.error);

    // Uninteresting actions
    // ---------------------

    default:
      return state;

  }
};
