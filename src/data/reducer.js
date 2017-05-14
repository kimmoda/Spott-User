/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
import { fromJS, List, Map } from 'immutable';
import * as actions from './actions';
import * as newActions from '../pages/newHome/actions';
import { FETCHING, UPDATING, ERROR, LOADED } from './statusTypes';
import { LOGOUT_SUCCESS } from '../pages/app/actions';

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

export default (state = fromJS({
  entities: {
    characters: {},
    media: {},
    products: {},
    scenes: {},
    users: {},
    tvGuideEntries: {},
    wishlists: {},
    spotts: {},
    newProducts: {}
  },
  relations: {
    characterHasProducts: {},
    mediumHasCharacters: {},
    mediumHasNewScenesForYou: {},
    mediumHasProducts: {},
    mediumHasSeasons: {},
    mediumHasEpisodes: {},
    mediumHasScenes: {},
    mediumHasTopProducts: {},
    mediumHasTopUserProducts: {},
    userHasSavedScenes: {},
    userHasWishlists: {},
    wishlistHasProducts: {},
    mediumHasRecentEpisodes: {}
  },
  lists: {
    popularProducts: {},
    popularMedia: {},
    recentlyAddedMedia: {},
    recentlyAddedToWishlistProducts: {},
    newEpisodes: {},
    newScenesForYou: {},
    tvGuideEntries: {}
  }
}), action) => {
  switch (action.type) {

    // Clear all user dependent data.
    case LOGOUT_SUCCESS:
      return state.setIn([ 'relations', 'mediumHasTopUserProducts' ], Map());

    // Media
    // /////

    case actions.MEDIA_RECENTLY_ADDED_FETCH_START:
      return fetchListStart(state, 'recentlyAddedMedia');
    case actions.MEDIA_RECENTLY_ADDED_FETCH_SUCCESS:
      // TODO: add pagination
      return fetchListSuccess(state, 'recentlyAddedMedia', 'media', action.data.data);
    case actions.MEDIA_RECENTLY_ADDED_FETCH_ERROR:
      return fetchListError(state, 'recentlyAddedMedia', action.error);

    // Products
    // ////////

    case actions.PRODUCT_FETCH_START:
      return fetchStart(state, [ 'entities', 'products', action.productId ]);
    case actions.PRODUCT_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId ], action.data);
    case actions.PRODUCT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'products', action.productId ], action.error);

    case actions.UB_PRODUCT_FETCH_START:
      return fetchStart(state, [ 'entities', 'products', action.productId, 'ub' ]);
    case actions.UB_PRODUCT_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId, 'ub' ], action.data);
    case actions.UB_PRODUCT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'products', action.productId, 'ub' ], action.error);

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

    case actions.POPULAR_MEDIA_FETCH_START:
      return fetchListStart(state, 'popularMedia');
    case actions.POPULAR_MEDIA_FETCH_SUCCESS:
      return fetchListSuccess(state, 'popularMedia', 'media', action.data);
    case actions.POPULAR_MEDIA_FETCH_ERROR:
      return fetchListError(state, 'popularMedia', action.error);

    case actions.WISHLIST_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'wishlistHasProducts', action.wishlistId);
    case actions.WISHLIST_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'wishlistHasProducts', action.wishlistId, 'products', action.data.data);
    case actions.WISHLIST_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'wishlistHasProducts', action.wishlistId, action.error);

    case actions.CHARACTER_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'characterHasProducts', action.characterId);
    case actions.CHARACTER_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'characterHasProducts', action.characterId, 'products', action.data.data);
    case actions.CHARACTER_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'characterHasProducts', action.characterId, action.error);

    case actions.MEDIUM_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasProducts', action.mediumId);
    case actions.MEDIUM_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasProducts', action.mediumId, 'products', action.data.data);
    case actions.MEDIUM_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasProducts', action.mediumId, action.error);

    case actions.MEDIUM_TOP_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasTopProducts', action.mediumId);
    case actions.MEDIUM_TOP_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasTopProducts', action.mediumId, 'products', action.data.data);
    case actions.MEDIUM_TOP_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasTopProducts', action.mediumId, action.error);

    case actions.MEDIUM_SEASONS_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasSeasons', action.mediumId);
    case actions.MEDIUM_SEASONS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasSeasons', action.mediumId, 'media', action.data);
    case actions.MEDIUM_SEASONS_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasSeasons', action.mediumId, action.error);

    case actions.MEDIUM_EPISODES_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasEpisodes', action.mediumId);
    case actions.MEDIUM_EPISODES_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasEpisodes', action.mediumId, 'media', action.data);
    case actions.MEDIUM_EPISODES_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasEpisodes', action.mediumId, action.error);

    case actions.MEDIUM_RECENT_EPISODES_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasRecentEpisodes', action.mediumId);
    case actions.MEDIUM_RECENT_EPISODES_FETCH_SUCCESS:
      return fetchRelationsSuccess(state, 'mediumHasRecentEpisodes', action.mediumId, 'media', action.data);
    case actions.MEDIUM_RECENT_EPISODES_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasRecentEpisodes', action.mediumId, action.error);

    case actions.MEDIUM_SCENES_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasScenes', action.mediumId);
    case actions.MEDIUM_SCENES_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasScenes', action.mediumId, 'scenes', action.data);
    case actions.MEDIUM_SCENES_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasScenes', action.mediumId, action.error);

    case actions.MEDIUM_TOP_USER_PRODUCTS_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasTopUserProducts', action.mediumId);
    case actions.MEDIUM_TOP_USER_PRODUCTS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasTopUserProducts', action.mediumId, 'products', action.data.data);
    case actions.MEDIUM_TOP_USER_PRODUCTS_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasTopUserProducts', action.mediumId, action.error);

    // Media
    // /////

    case actions.MEDIUM_FETCH_START:
      return fetchStart(state, [ 'entities', 'media', action.mediumId ]);
    case actions.MEDIUM_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'media', action.mediumId ], action.data);
    case actions.MEDIUM_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'media', action.mediumId ], action.error);

    case actions.NEW_EPISODES_FETCH_START:
      return fetchListStart(state, 'newEpisodes');
    case actions.NEW_EPISODES_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchListSuccess(state, 'newEpisodes', 'media', action.data);
    case actions.NEW_EPISODES_FETCH_ERROR:
      return fetchListError(state, 'newEpisodes', action.error);

    case actions.MEDIUM_SUBSCRIBER_ADD_SUCCESS:
      return state.setIn([ 'entities', 'media', action.mediumId, 'subscribed' ], true);

    case actions.MEDIUM_SUBSCRIBER_REMOVE_SUCCESS:
      return state.setIn([ 'entities', 'media', action.mediumId, 'subscribed' ], false);

    // Users
    // /////

    case actions.USER_FETCH_START:
      return fetchStart(state, [ 'entities', 'users', action.userId ]);
    case actions.USER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'users', action.userId ], action.data);
    case actions.USER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'users', action.userId ], action.error);

    // Wishlists
    // /////////

    case actions.WISHLISTS_OF_USER_FETCH_START:
      return fetchRelationsStart(state, 'userHasWishlists', action.userId);
    case actions.WISHLISTS_OF_USER_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'userHasWishlists', action.userId, 'wishlists', action.data.data);
    case actions.WISHLISTS_OF_USER_FETCH_ERROR:
      return fetchRelationsError(state, 'userHasWishlists', action.userId, action.error);

    // Scenes
    // //////

    case actions.NEW_SCENES_FOR_YOU_FETCH_START:
      return fetchListStart(state, 'newScenesForYou');
    case actions.NEW_SCENES_FOR_YOU_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchListSuccess(state, 'newScenesForYou', 'scenes', action.data);
    case actions.NEW_SCENES_FOR_YOU_FETCH_ERROR:
      return fetchListError(state, 'newScenesForYou', action.error);

    case actions.MEDIUM_NEW_SCENES_FOR_YOU_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasNewScenesForYou', action.mediumId);
    case actions.MEDIUM_NEW_SCENES_FOR_YOU_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasNewScenesForYou', action.mediumId, 'scenes', action.data);
    case actions.MEDIUM_NEW_SCENES_FOR_YOU_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasNewScenesForYou', action.mediumId, action.error);

    case actions.SCENE_FETCH_START:
      return fetchStart(state, [ 'entities', 'scenes', action.sceneId ]);
    case actions.SCENE_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'scenes', action.sceneId ], action.data);
    case actions.SCENE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'scenes', action.sceneId ], action.error);

    case actions.SAVED_SCENES_OF_USER_FETCH_START:
      return fetchRelationsStart(state, 'userHasSavedScenes', action.userId);
    case actions.SAVED_SCENES_OF_USER_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'userHasSavedScenes', action.userId, 'scenes', action.data.data);
    case actions.SAVED_SCENES_OF_USER_FETCH_ERROR:
      return fetchRelationsError(state, 'userHasSavedScenes', action.userId, action.error);

    // Characters
    // //////////

    case actions.CHARACTER_FETCH_START:
      return fetchStart(state, [ 'entities', 'characters', action.characterId ]);
    case actions.CHARACTER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'characters', action.characterId ], action.data);
    case actions.CHARACTER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'characters', action.characterId ], action.error);

    case actions.MEDIUM_CHARACTERS_FETCH_START:
      return fetchRelationsStart(state, 'mediumHasCharacters', action.mediumId);
    case actions.MEDIUM_CHARACTERS_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchRelationsSuccess(state, 'mediumHasCharacters', action.mediumId, 'characters', action.data.data);
    case actions.MEDIUM_CHARACTERS_FETCH_ERROR:
      return fetchRelationsError(state, 'mediumHasCharacters', action.mediumId, action.error);

    // Tv Guide Entries
    // //////

    case actions.TV_GUIDE_ENTRIES_FETCH_START:
      return fetchListStart(state, 'tvGuideEntries');
    case actions.TV_GUIDE_ENTRIES_FETCH_SUCCESS:
      // TODO: add paging!
      return fetchListSuccess(state, 'tvGuideEntries', 'tvGuideEntries', action.data);
    case actions.TV_GUIDE_ENTRIES_FETCH_ERROR:
      return fetchListError(state, 'tvGuideEntries', action.error);

    // new API actions

    case newActions.GET_SPOTT_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid ]);
    case newActions.GET_SPOTT_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid ], action.data);
    case newActions.GET_SPOTT_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid ], action.error);

    case newActions.GET_SPOTT_RELATED_TOPICS_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid, 'relatedTopics' ]);
    case newActions.GET_SPOTT_RELATED_TOPICS_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid, 'relatedTopics' ], action.data);
    case newActions.GET_SPOTT_RELATED_TOPICS_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid, 'relatedTopics' ], action.error);

    case newActions.GET_SPOTT_SIMILAR_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid, 'similar' ]);
    case newActions.GET_SPOTT_SIMILAR_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid, 'similar' ], action.data);
    case newActions.GET_SPOTT_SIMILAR_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid, 'similar' ], action.error);

    case newActions.GET_SPOTT_LOVERS_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid, 'lovers' ]);
    case newActions.GET_SPOTT_LOVERS_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid, 'lovers' ], action.data);
    case newActions.GET_SPOTT_LOVERS_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid, 'lovers' ], action.error);

    case newActions.SET_SPOTT_LOVER_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid ]);
    case newActions.SET_SPOTT_LOVER_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid ], action.data);
    case newActions.SET_SPOTT_LOVER_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid ], action.error);

    case newActions.REMOVE_SPOTT_LOVER_START:
      return fetchStart(state, [ 'entities', 'spotts', action.uuid ]);
    case newActions.REMOVE_SPOTT_LOVER_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'spotts', action.uuid ], action.data);
    case newActions.REMOVE_SPOTT_LOVER_ERROR:
      return fetchError(state, [ 'entities', 'spotts', action.uuid ], action.error);

    case newActions.GET_PRODUCT_START:
      return fetchStart(state, [ 'entities', 'newProducts', action.uuid ]);
    case newActions.GET_PRODUCT_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'newProducts', action.uuid ], action.data);
    case newActions.GET_PRODUCT_ERROR:
      return fetchError(state, [ 'entities', 'newProducts', action.uuid ], action.error);

    case newActions.GET_PRODUCT_SIMILAR_START:
      return fetchStart(state, [ 'entities', 'newProducts', action.uuid, 'similar' ]);
    case newActions.GET_PRODUCT_SIMILAR_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'newProducts', action.uuid, 'similar' ], action.data);
    case newActions.GET_PRODUCT_SIMILAR_ERROR:
      return fetchError(state, [ 'entities', 'newProducts', action.uuid, 'similar' ], action.error);

    // Uninteresting actions
    // ---------------------

    default:
      return state;

  }
};
