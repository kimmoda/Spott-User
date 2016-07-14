/* eslint no-return-assign: 0 */
/* eslint no-param-reassign: 0 */
import { fromJS, List, Map } from 'immutable';
import { normalize, Schema, arrayOf } from 'normalizr';
import * as actions from './actions';
import { FETCHING, UPDATING, ERROR, LOADED } from './statusTypes';
import feedPostTypes from './feedPostTypes';

const appearanceSchema = new Schema('appearances', { idAttribute: 'appearanceId' });
const characterFaceSchema = new Schema('characterFaces');
const feedPostSchema = new Schema('feedPosts');
const mediumCategorySchema = new Schema('mediumCategories');
const platformSchema = new Schema('platforms');
const processRequestSchema = new Schema('processRequests');
const productCategorySchema = new Schema('productCategories');
const productOfferingSchema = new Schema('productOfferings');
const productSchema = new Schema('products');
const sceneSchema = new Schema('scenes');
const seriesSchema = new Schema('series');
const tagSchema = new Schema('tags');

// path is e.g., [ 'relations', type, id ]
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

function fetchSuccess (state, path, data) {
  return state.setIn(path, fromJS({ ...data, _status: LOADED }));
}

function fetchError (state, path, error) {
  return state.setIn(path, Map({ _error: error, _status: ERROR }));
}

function serializeSeriesFilterHasSeasons ({ searchString, seriesId }) {
  return `searchString=${encodeURIComponent(searchString)}&seriesId=${seriesId}`;
}

export function serializeFilterHasProducts ({ page, publishStatus = '', searchString = '', used = false }) {
  return `page=${page}&publishStatus=${publishStatus}&searchString=${searchString}&used=${used}`;
}

export function serializeFilterHasBrands ({ page, publishStatus = '', searchString = '', used = false }) {
  return `page=${page}&publishStatus=${publishStatus}&searchString=${searchString}&used=${used}`;
}

export function serializeFilterHasPushes ({ page, publishStatus = '' }) {
  return `page=${page}&publishStatus=${publishStatus}`;
}

function searchStart (state, relationsKey, key) {
  return fetchStart(state, [ 'relations', relationsKey, key ]);
}

function searchSuccess (state, entitiesKey, relationsKey, key, data) {
  data.forEach((item) => item._status = LOADED); // Add _status 'loaded' to each fetched entity.
  return state
    .mergeIn([ 'entities', entitiesKey ], fromJS(data.reduce((accumulator, next) => {
      accumulator[next.id] = next;
      return accumulator;
    }, {})))
    .setIn([ 'relations', relationsKey, key ],
      Map({ _status: LOADED, data: List(data.map((item) => item.id)) }));
}

function searchError (state, relationsKey, key, error) {
  return fetchError(state, [ 'relations', relationsKey, key ], error);
}

// TRANSFORMS INPUT: [ { id, matchPercentage, product }]
// TO: [ { id, matchPercentage, productId }]
// RETURNS [ product ]
function stripSimilarProducts (similarProducts) {
  const result = [];
  for (let i = 0; i < similarProducts.length; i++) {
    const similarProduct = similarProducts[i];
    const prod = similarProduct.product;

    // Add productId to similar product relation and remove product property.
    similarProduct.productId = prod.id;
    Reflect.deleteProperty(similarProduct, 'product');
    result.push(prod);
  }
  return result;
}

function stripProductSuggestions (productSuggestions) {
  const result = [];
  for (let i = 0; i < productSuggestions.length; i++) {
    const productSuggestion = productSuggestions[i];
    const prod = productSuggestion.product;

    // Add productId to similar product relation and remove product property.
    productSuggestion.productId = prod.id;
    Reflect.deleteProperty(productSuggestion, 'product');
    result.push(prod);
  }
  return result;
}

/**
  * data
  * -> entities
  *    -> actors
  *    -> appearances
  *    -> brands
  *    -> characters
  *    -> characterFaces
  *    -> commercials
  *    -> episodes
  *    -> feedPosts
  *    -> mediumCategories
  *    -> movies
  *    -> platforms
  *    -> processRequests
  *    -> processRequestLogs
  *    -> productCategories
  *    -> productOfferings
  *    -> products
  *    -> pushes
  *    -> scenes
  *    -> seasons
  *    -> series
  *    -> shops
  *    -> tags
  *    -> videos
  * -> relations
  *    -> mediumHasFeedPosts { mediumId: [ id ] }
  *    -> pageHasMediumCategories { page: [ id ] }
  *    -> pageHasProcessRequests { page: [ id ] }
  *    -> pageHasProductCategories { page: [ id ] }
  *    -> pageHasTags { page: [ id ] }
  *    -> filterHasBrands: { filter: [ id ] }
  *    -> filterHasProducts: { filter: [ id ] }
  *    -> filterHasPushes: { filter: [ id ] }
  *    -> productHasOfferings { productId: [ { amount, buyUrl, id, shopId } ] }
  *    -> productHasSimilarProducts { productId: [ { id, matchPercentage, product, productId } ] }
  *    -> productImageHasProductSuggestions { imageId: [ { accuracy, product } ] }
  *    -> sceneHasProducts { sceneId: [ appearanceId ]}
  *    -> searchStringHasBrands { searchString: [ id ] },
  *    -> searchStringHasCharacters { searchString: [ id ] },
  *    -> searchStringHasMediumCategories { searchString: [ id ] },
  *    -> searchStringHasPlatforms { searchString: [ id ] },
  *    -> searchStringHasProductCategories { searchString: [ id ] }
  *    -> searchStringHasProducts { searchString: [ id ] }
  *    -> searchStringHasSeries { searchString: [ id ] }
  *    -> searchStringHasShops { searchString: [ id ] }
  *    -> searchStringHasTags { searchString: [ id ] }
  *    -> seriesFilterHasSeasons { seriesId=<seriesId>&searchString=<searchString>: [ id ]}
  *    -> videoHasScenes
  */
export default (state = fromJS({
  entities: {
    actors: {},
    appearances: {},
    brands: {},
    characterFaces: {},
    characters: {},
    commercials: {},
    episodes: {},
    feedPosts: {},
    mediumCategories: {},
    movies: {},
    platforms: {},
    processRequestLogs: {},
    processRequests: {},
    productCategories: {},
    productOfferings: {},
    products: {},
    pushes: {},
    scenes: {},
    seasons: {},
    series: {},
    shops: {},
    tags: {},
    videos: {}
  },
  relations: {
    characterIdHasFacePages: {},
    filterHasBrands: {},
    filterHasProducts: {},
    filterHasPushes: {},
    mediumHasFeedPosts: {},
    pageHasMediumCategories: {},
    pageHasPlatforms: {},
    pageHasProcessRequests: {},
    pageHasProductCategories: {},
    pageHasTags: {},
    productHasOfferings: {},
    productHasSimilarProducts: {},
    productImageHasProductSuggestions: {},
    sceneHasProducts: {},
    searchStringHasActors: {},
    searchStringHasBrands: {},
    searchStringHasCharacters: {},
    searchStringHasMediumCategories: {},
    searchStringHasPlatforms: {},
    searchStringHasProductCategories: {},
    searchStringHasProducts: {},
    searchStringHasSeries: {},
    searchStringHasShops: {},
    searchStringHasTags: {},
    seriesFilterHasSeasons: {},
    videoHasScenes: {}
  }
}), action) => {
  switch (action.type) {

    // Actors
    // //////

    case actions.ACTOR_FETCH_START:
      return fetchStart(state, [ 'entities', 'actors', action.actorId ]);
    case actions.ACTOR_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'actors', action.actorId ], action.data);
    case actions.ACTOR_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'actors', action.actorId ], action.error);

    case actions.ACTOR_SEARCH_START:
      return searchStart(state, 'searchStringHasActors', action.searchString);
    case actions.ACTOR_SEARCH_SUCCESS:
      return searchSuccess(state, 'actors', 'searchStringHasActors', action.searchString, action.data);
    case actions.ACTOR_SEARCH_ERROR:
      return searchError(state, 'searchStringHasActors', action.searchString, action.error);

    // Brands
    // //////

    case actions.BRAND_FETCH_START:
      return fetchStart(state, [ 'entities', 'brands', action.brandId ]);
    case actions.BRAND_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'brands', action.brandId ], action.data);
    case actions.BRAND_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'brands', action.brandId ], action.error);

    case actions.BRANDS_FETCH_START:
      return searchStart(state, 'filterHasBrands', serializeFilterHasBrands(action));
    case actions.BRANDS_FETCH_SUCCESS:
      return searchSuccess(state, 'brands', 'filterHasBrands', serializeFilterHasBrands(action), action.data.data);
    case actions.BRANDS_FETCH_ERROR:
      return searchError(state, 'filterHasBrands', serializeFilterHasBrands(action), action.error);

    case actions.BRAND_SEARCH_START:
      return searchStart(state, 'searchStringHasBrands', action.searchString);
    case actions.BRAND_SEARCH_SUCCESS:
      return searchSuccess(state, 'brands', 'searchStringHasBrands', action.searchString, action.data);
    case actions.BRAND_SEARCH_ERROR:
      return searchError(state, 'searchStringHasBrands', action.searchString, action.error);

    // Characters
    // //////////

    case actions.CHARACTER_FETCH_START:
      return fetchStart(state, [ 'entities', 'characters', action.characterId ]);
    case actions.CHARACTER_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'characters', action.characterId ], action.data);
    case actions.CHARACTER_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'characters', action.characterId ], action.error);

    case actions.CHARACTER_SEARCH_START:
      return searchStart(state, 'searchStringHasCharacters', action.searchString);
    case actions.CHARACTER_SEARCH_SUCCESS:
      return searchSuccess(state, 'characters', 'searchStringHasCharacters', action.searchString, action.data);
    case actions.CHARACTER_SEARCH_ERROR:
      return searchError(state, 'searchStringHasCharacters', action.searchString, action.error);

    case actions.CHARACTER_FACES_FETCH_START: {
      let newState = state;
      // Create this part of the store if it doesn't exist yet
      if (!newState.hasIn([ 'relations', 'characterIdHasFacePages', action.characterId ])) {
        newState = newState.setIn([ 'relations', 'characterIdHasFacePages', action.characterId ], Map());
      }
      if (!newState.hasIn([ 'relations', 'characterIdHasFacePages', action.characterId, action.page ])) {
        newState = newState.setIn([ 'relations', 'characterIdHasFacePages', action.characterId, action.page ], Map());
      }
      // Update the _status for the provided page of characterFaces
      return fetchStart(newState, [ 'relations', 'characterIdHasFacePages', action.characterId, action.page ]);
    }
    case actions.CHARACTER_FACES_FETCH_SUCCESS: {
      let newState = state;
      const characterFaces = action.data.data;
      // set _status to LOADED on every face object
      characterFaces.forEach((cf) => cf._status = LOADED);
      // Normalize data, separating ids from actual objects
      const { entities: { characterFaces: characterFaceEntities }, result: characterFaceResult } = normalize(characterFaces, arrayOf(characterFaceSchema));
      // Merge the faces into the characterFacesEntities part of the store (with appropriate '_status')
      newState = newState.mergeIn([ 'entities', 'characterFaces' ], characterFaceEntities);
      // Update relation
      return fetchSuccess(newState, [ 'relations', 'characterIdHasFacePages', action.characterId, action.page ], { data: List(characterFaceResult) });
    }
    case actions.CHARACTER_FACES_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'characterIdHasFacePages', action.characterId, action.page ], action.error);

    case actions.CHARACTER_FACE_DELETE_SUCCESS:
      // Remove from entities
      state = state.deleteIn([ 'entities', 'characterFaces', action.characterFaceId ]);
      // Since we do not know the page on which the characterface is displayed,
      // we remove the id from all relations.
      state = state.setIn([ 'relations', 'characterIdHasFacePages', action.characterId ],
        state.getIn([ 'relations', 'characterIdHasFacePages', action.characterId ]).map((facePage) => {
          // Data is not present when _status !== LOADED
          if (facePage.get('_status') === LOADED) {
            return facePage.setIn([ 'data' ],
              facePage.getIn([ 'data' ]).filter((id) => id !== action.characterFaceId)
            );
          }
          return facePage;
        })
      );
      // Done!
      return state;

    case actions.CHARACTER_FACE_PERSIST_SUCCESS:
      // Add new face to the faces entity
      return state.mergeIn([ 'entities', 'characterFaces' ], action.characterFace);

    // Commercials
    // ///////////

    case actions.COMMERCIAL_FETCH_START:
      return fetchStart(state, [ 'entities', 'commercials', action.commercialId ]);
    case actions.COMMERCIAL_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'commercials', action.commercialId ], action.data);
    case actions.COMMERCIAL_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'commercials', action.commercialId ], action.error);

    // Episodes
    // ////////

    case actions.EPISODE_FETCH_START:
      return fetchStart(state, [ 'entities', 'episodes', action.episodeId ]);
    case actions.EPISODE_FETCH_SUCCESS: {
      return fetchSuccess(state, [ 'entities', 'episodes', action.episodeId ], action.data);
    }
    case actions.EPISODE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'episodes', action.episodeId ], action.error);

    // Medium categories
    // /////////////////

    case actions.MEDIUM_CATEGORY_FETCH_START:
      return fetchStart(state, [ 'entities', 'mediumCategories', action.mediumCategoryId ]);
    case actions.MEDIUM_CATEGORY_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'mediumCategories', action.mediumCategoryId ], action.data);
    case actions.MEDIUM_CATEGORY_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'mediumCategories', action.mediumCategoryId ], action.error);

    case actions.MEDIUM_CATEGORIES_SEARCH_START:
      return searchStart(state, 'searchStringHasMediumCategories', action.searchString);
    case actions.MEDIUM_CATEGORIES_SEARCH_SUCCESS:
      return searchSuccess(state, 'mediumCategories', 'searchStringHasMediumCategories', action.searchString, action.data);
    case actions.MEDIUM_CATEGORIES_SEARCH_ERROR:
      return searchError(state, 'searchStringHasMediumCategories', action.searchString, action.error);

    case actions.MEDIUM_CATEGORIES_FETCH_START:
      return fetchStart(state, [ 'relations', 'pageHasMediumCategories', action.page ]);
    case actions.MEDIUM_CATEGORIES_FETCH_SUCCESS: {
      const mediumCategories = action.data.data;
      mediumCategories.forEach((mc) => mc._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { mediumCategories: mediumCategoryEntities }, result: mediumCategoriesResult } = normalize(mediumCategories, arrayOf(mediumCategorySchema));
      return state
        .mergeIn([ 'entities', 'mediumCategories' ], mediumCategoryEntities)
        .setIn([ 'relations', 'pageHasMediumCategories', action.page ], Map({ _status: LOADED, data: List(mediumCategoriesResult) }));
    }
    case actions.MEDIUM_CATEGORIES_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'pageHasMediumCategories', action.page ], action.error);

    // Movies
    // //////

    case actions.MOVIE_FETCH_START:
      return fetchStart(state, [ 'entities', 'movies', action.movieId ]);
    case actions.MOVIE_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'movies', action.movieId ], action.data);
    case actions.MOVIE_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'movies', action.movieId ], action.error);

    // Feed posts
    // //////////

    case actions.FEED_POSTS_FETCH_START:
      return fetchStart(state, [ 'relations', 'mediumHasFeedPosts', action.mediumId ]);
    case actions.FEED_POSTS_FETCH_SUCCESS: {
      const feedPosts = action.data;
      feedPosts.forEach((fp) => fp._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { feedPosts: feedPostEntities }, result: feedPostResult } = normalize(feedPosts, arrayOf(feedPostSchema));
      return state
        .mergeIn([ 'entities', 'feedPosts' ], feedPostEntities)
        .setIn([ 'relations', 'mediumHasFeedPosts', action.mediumId ], Map({ _status: LOADED, data: List(feedPostResult) }));
    }
    case actions.FEED_POSTS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'mediumHasFeedPosts', action.mediumId ], action.error);
    case actions.FEED_POST_PERSIST_SUCCESS: {
      // Get the persisted feed post and make it ready for use in the entities hash
      const newFeedPost = action.data;
      newFeedPost._status = LOADED; // Add _status 'loaded' to the persisted entity.
      // Add to the entities hash
      state = state.setIn([ 'entities', 'feedPosts', newFeedPost.id ], fromJS(newFeedPost));
      // Add to the necessary relations, depending on subject type
      switch (feedPostTypes[newFeedPost.type].subjectType) {
        case 'MEDIUM':
          if (!state.getIn([ 'relations', 'mediumHasFeedPosts', action.subject, 'data' ]).includes(newFeedPost.id)) {
            state = state.setIn(
              [ 'relations', 'mediumHasFeedPosts', action.subject, 'data' ],
              state.getIn([ 'relations', 'mediumHasFeedPosts', action.subject, 'data' ]).push(newFeedPost.id)
            );
          }
      }
      // Done!
      return state;
    }
    case actions.FEED_POST_DELETE_SUCCESS: {
      // Remove from entities
      state = state.deleteIn([ 'entities', 'feedPosts', action.feedPostId ]);
      // Since we do not know the feed post's type (subject type to be more concrete),
      // we remove the id from all relations.
      state = state.setIn([ 'relations', 'mediumHasFeedPosts' ],
        state.getIn([ 'relations', 'mediumHasFeedPosts' ]).map((feedPostsOfMedium) => {
          if (feedPostsOfMedium.get('_status') === LOADED) {
            return feedPostsOfMedium.setIn([ 'data' ],
              feedPostsOfMedium.getIn([ 'data' ]).filter((id) => id !== action.feedPostId)
            );
          }
          return feedPostsOfMedium;
        })
      );
      // Done!
      return state;
    }

    // Tags
    // ////

    case actions.TAG_FETCH_START:
      return fetchStart(state, [ 'entities', 'tags', action.tagId ]);
    case actions.TAG_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'tags', action.tagId ], action.data);
    case actions.TAG_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'tags', action.tagId ], action.error);

    case actions.TAGS_SEARCH_START:
      return searchStart(state, 'searchStringHasTags', action.searchString);
    case actions.TAGS_SEARCH_SUCCESS:
      return searchSuccess(state, 'tags', 'searchStringHasTags', action.searchString, action.data);
    case actions.TAGS_SEARCH_ERROR:
      return searchError(state, 'searchStringHasTags', action.searchString, action.error);

    case actions.TAGS_FETCH_START:
      return fetchStart(state, [ 'relations', 'pageHasTags', action.page ]);
    case actions.TAGS_FETCH_SUCCESS: {
      const tags = action.data.data;
      tags.forEach((mc) => mc._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { tags: tagEntities }, result: tagsResult } = normalize(tags, arrayOf(tagSchema));
      return state
        .mergeIn([ 'entities', 'tags' ], tagEntities)
        .setIn([ 'relations', 'pageHasTags', action.page ], Map({ _status: LOADED, data: List(tagsResult) }));
    }
    case actions.TAGS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'pageHasTags', action.page ], action.error);

    // Platforms
    // /////////

    case actions.PLATFORM_FETCH_START:
      return fetchStart(state, [ 'entities', 'platforms', action.platformId ]);
    case actions.PLATFORM_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'platforms', action.platformId ], action.data);
    case actions.PLATFORM_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'platforms', action.platformId ], action.error);

    case actions.PLATFORMS_SEARCH_START:
      return searchStart(state, 'searchStringHasPlatforms', action.searchString);
    case actions.PLATFORMS_SEARCH_SUCCESS:
      return searchSuccess(state, 'platforms', 'searchStringHasPlatforms', action.searchString, action.data);
    case actions.PLATFORMS_SEARCH_ERROR:
      return searchError(state, 'searchStringHasPlatforms', action.searchString, action.error);

    case actions.PLATFORMS_FETCH_START:
      return fetchStart(state, [ 'relations', 'pageHasPlatforms', action.page ]);
    case actions.PLATFORMS_FETCH_SUCCESS: {
      const platforms = action.data.data;
      platforms.forEach((pl) => pl._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { platforms: platformEntities }, result: platformsResult } = normalize(platforms, arrayOf(platformSchema));
      return state
        .mergeIn([ 'entities', 'platforms' ], platformEntities)
        .setIn([ 'relations', 'pageHasPlatforms', action.page ], Map({ _status: LOADED, data: List(platformsResult) }));
    }
    case actions.PLATFORMS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'pageHasPlatforms', action.page ], action.error);

    // Process requests
    // ////////////////

    case actions.PROCESS_REQUESTS_FETCH_START:
      return fetchStart(state, [ 'relations', 'pageHasProcessRequests', action.page ]);
    case actions.PROCESS_REQUESTS_FETCH_SUCCESS: {
      const processRequests = action.data.data;
      processRequests.forEach((pq) => pq._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { processRequests: processRequestEntities }, result: processRequestResult } = normalize(processRequests, arrayOf(processRequestSchema));
      return state
        .mergeIn([ 'entities', 'processRequests' ], processRequestEntities)
        .setIn([ 'relations', 'pageHasProcessRequests', action.page ], Map({ _status: LOADED, data: List(processRequestResult) }));
    }
    case actions.PROCESS_REQUESTS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'pageHasProcessRequests', action.page ], action.error);

    case actions.PROCESS_REQUEST_LOG_FETCH_START:
      return fetchStart(state, [ 'entities', 'processRequestLogs', action.requestId ]);
    case actions.PROCESS_REQUEST_LOG_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'processRequestLogs', action.requestId ], action.data);
    case actions.PROCESS_REQUEST_LOG_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'processRequestLogs', action.requestId ], action.error);

    // Products
    // ////////

    case actions.PRODUCT_FETCH_START:
      return fetchStart(state, [ 'entities', 'products', action.productId ]);
    case actions.PRODUCT_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'products', action.productId ], action.data);
    case actions.PRODUCT_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'products', action.productId ], action.error);

    case actions.PRODUCTS_FETCH_START:
      return searchStart(state, 'filterHasProducts', serializeFilterHasProducts(action));
    case actions.PRODUCTS_FETCH_SUCCESS:
      return searchSuccess(state, 'products', 'filterHasProducts', serializeFilterHasProducts(action), action.data.data);
    case actions.PRODUCTS_FETCH_ERROR:
      return searchError(state, 'filterHasProducts', serializeFilterHasProducts(action), action.error);

    case actions.PRODUCT_SEARCH_START:
      return searchStart(state, 'searchStringHasProducts', action.searchString);
    case actions.PRODUCT_SEARCH_SUCCESS:
      return searchSuccess(state, 'products', 'searchStringHasProducts', action.searchString, action.data);
    case actions.PRODUCT_SEARCH_ERROR:
      return searchError(state, 'searchStringHasProducts', action.searchString, action.error);

    case actions.PRODUCT_OFFERINGS_FETCH_START:
      return fetchStart(state, [ 'relations', 'productHasOfferings', action.productId ]);
    case actions.PRODUCT_OFFERINGS_FETCH_SUCCESS: {
      const productOfferings = action.data;
      productOfferings.forEach((po) => po._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { productOfferings: productOfferingEntities }, result: productOfferingResult } = normalize(productOfferings, arrayOf(productOfferingSchema));
      return state
        .mergeIn([ 'entities', 'productOfferings' ], productOfferingEntities)
        .setIn([ 'relations', 'productHasOfferings', action.productId ], Map({ _status: LOADED, data: List(productOfferingResult) }));
    }
    case actions.PRODUCT_OFFERINGS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'productHasOfferings', action.productId ], action.error);

    // Pushes
    // //////

    case actions.PUSH_FETCH_START:
      return fetchStart(state, [ 'entities', 'pushes', action.pushId ]);
    case actions.PUSH_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'pushes', action.pushId ], action.data);
    case actions.PUSH_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'pushes', action.pushId ], action.error);

    case actions.PUSHES_FETCH_START:
      return searchStart(state, 'filterHasPushes', serializeFilterHasPushes(action));
    case actions.PUSHES_FETCH_SUCCESS:
      return searchSuccess(state, 'pushes', 'filterHasPushes', serializeFilterHasPushes(action), action.data.data);
    case actions.PUSHES_FETCH_ERROR:
      return searchError(state, 'filterHasPushes', serializeFilterHasPushes(action), action.error);

    // Seasons
    // ///////

    case actions.SEASON_FETCH_START:
      return fetchStart(state, [ 'entities', 'seasons', action.seasonId ]);
    case actions.SEASON_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'seasons', action.seasonId ], action.data);
    case actions.SEASON_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'seasons', action.seasonId ], action.error);

    case actions.SEASONS_SEARCH_START:
      return searchStart(state, 'seriesFilterHasSeasons', serializeSeriesFilterHasSeasons(action));
    case actions.SEASONS_SEARCH_SUCCESS:
      return searchSuccess(state, 'seasons', 'seriesFilterHasSeasons', serializeSeriesFilterHasSeasons(action), action.data);
    case actions.SEASONS_SEARCH_ERROR:
      return searchError(state, 'seriesFilterHasSeasons', serializeSeriesFilterHasSeasons(action), action.error);

    // Scene products
    // //////////////

    case actions.SCENE_PRODUCTS_FETCH_START:
      return fetchStart(state, [ 'relations', 'sceneHasProducts', action.sceneId ]);
    case actions.SCENE_PRODUCTS_FETCH_SUCCESS: {
      const { entities: { appearances: appearanceEntities }, result: appearancesResult } = normalize(action.data, arrayOf(appearanceSchema));
      return state
        .mergeIn([ 'entities', 'appearances' ], appearanceEntities)
        .setIn([ 'relations', 'sceneHasProducts', action.sceneId ], Map({ _status: LOADED, data: List(appearancesResult) }));
    }
    case actions.SCENE_PRODUCTS_FETCH_ERROR:
      return fetchError([ 'relations', 'sceneHasProducts', action.sceneId ], action.error);

    // Series
    // //////

    case actions.SERIES_FETCH_START:
      return fetchStart(state, [ 'entities', 'series', action.seriesId ]);
    case actions.SERIES_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'series', action.seriesId ], action.data);
    case actions.SERIES_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'series', action.seriesId ], action.error);

    case actions.SERIES_SEARCH_START:
      return fetchStart(state, [ 'relations', 'searchStringHasSeries', action.searchString ]);
    case actions.SERIES_SEARCH_SUCCESS: {
      const series = action.data;
      series.forEach((s) => s._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { series: seriesEntities }, result: seriesResult } = normalize(series, arrayOf(seriesSchema));
      return state
        .mergeIn([ 'entities', 'series' ], seriesEntities)
        .setIn([ 'relations', 'searchStringHasSeries', action.searchString ], Map({ _status: LOADED, data: List(seriesResult) }));
    }
    case actions.SERIES_SEARCH_ERROR:
      return fetchError(state, [ 'relations', 'searchStringHasSeries', action.searchString ], action.error);

    // Shop
    // ////

    case actions.SHOP_FETCH_START:
      return fetchStart(state, [ 'entities', 'shops', action.shopId ]);
    case actions.SHOP_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'shops', action.shopId ], action.data);
    case actions.SHOP_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'shops', action.shopId ], action.error);

    case actions.SHOP_SEARCH_START:
      return searchStart(state, 'searchStringHasShops', action.searchString);
    case actions.SHOP_SEARCH_SUCCESS:
      return searchSuccess(state, 'shops', 'searchStringHasShops', action.searchString, action.data);
    case actions.SHOP_SEARCH_ERROR:
      return searchError(state, 'searchStringHasShops', action.searchString, action.error);

    // Similar products
    // ////////////////

    case actions.SIMILAR_PRODUCT_DELETE_SUCCESS: {
      const similarProducts = state.getIn([ 'relations', 'productHasSimilarProducts', action.productId, 'data' ]);
      return state.setIn(
        [ 'relations', 'productHasSimilarProducts', action.productId, 'data' ],
        similarProducts.filterNot((similarProduct) => similarProduct.get('id') === action.similarityId)
      );
    }
    case actions.SIMILAR_PRODUCTS_FETCH_START:
      return fetchStart(state, [ 'relations', 'productHasSimilarProducts', action.productId ]);
    case actions.SIMILAR_PRODUCTS_FETCH_SUCCESS: {
      const similarProductRelations = action.data; // similarProductRelations = [ { id, matchPercentage, product }]
      const products = stripSimilarProducts(similarProductRelations); // similarProductRelations = [ { id, matchPercentage, productId }]
      products.forEach((p) => p._status = LOADED); // Add _status 'loaded' to each fetched entity.

      const { entities: { products: productEntities } } = normalize(products, arrayOf(productSchema));
      return state
        .mergeIn([ 'entities', 'products' ], productEntities)
        .setIn([ 'relations', 'productHasSimilarProducts', action.productId ], Map({ _status: LOADED, data: fromJS(similarProductRelations) }));
    }
    case actions.SIMILAR_PRODUCTS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'productHasSimilarProducts', action.productId ], action.error);

    case actions.PRODUCT_SUGGESTIONS_FETCH_START:
      return fetchStart(state, [ 'relations', 'productImageHasProductSuggestions', action.imageId ]);
    case actions.PRODUCT_SUGGESTIONS_FETCH_SUCCESS: {
      const productSuggestionsRelations = action.data; // productSuggestionsRelations = [ { accuracy, product }]
      const products = stripProductSuggestions(productSuggestionsRelations); //  = [ { id, matchPercentage, productId }]
      products.forEach((p) => p._status = LOADED); // Add _status 'loaded' to each fetched entity.

      const { entities: { products: productEntities } } = normalize(products, arrayOf(productSchema));
      return state
        .mergeIn([ 'entities', 'products' ], productEntities)
        .setIn([ 'relations', 'productImageHasProductSuggestions', action.imageId ], Map({ _status: LOADED, data: fromJS(productSuggestionsRelations) }));
    }
    case actions.PRODUCT_SUGGESTIONS_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'productImageHasProductSuggestions', action.imageId ], action.error);

    // Product categories
    // //////////////////

    case actions.PRODUCT_CATEGORY_FETCH_START:
      return fetchStart(state, [ 'entities', 'productCategories', action.categoryId ]);
    case actions.PRODUCT_CATEGORY_FETCH_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'productCategories', action.categoryId ], action.data);
    case actions.PRODUCT_CATEGORY_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'productCategories', action.categoryId ], action.error);

    case actions.PRODUCT_CATEGORIES_SEARCH_START:
      return searchStart(state, 'searchStringHasProductCategories', action.searchString);
    case actions.PRODUCT_CATEGORIES_SEARCH_SUCCESS:
      return searchSuccess(state, 'productCategories', 'searchStringHasProductCategories', action.searchString, action.data);
    case actions.PRODUCT_CATEGORIES_SEARCH_ERROR:
      return searchError(state, 'searchStringHasProductCategories', action.searchString, action.error);

    case actions.PRODUCT_CATEGORIES_FETCH_START:
      return fetchStart(state, [ 'relations', 'pageHasProductCategories', action.page ]);
    case actions.PRODUCT_CATEGORIES_FETCH_SUCCESS: {
      const productCategories = action.data.data;
      productCategories.forEach((mc) => mc._status = LOADED); // Add _status 'loaded' to each fetched entity.
      const { entities: { productCategories: productCategoryEntities }, result: productCategoriesResult } = normalize(productCategories, arrayOf(productCategorySchema));
      return state
        .mergeIn([ 'entities', 'productCategories' ], productCategoryEntities)
        .setIn([ 'relations', 'pageHasProductCategories', action.page ], Map({ _status: LOADED, data: List(productCategoriesResult) }));
    }
    case actions.PRODUCT_CATEGORIES_FETCH_ERROR:
      return fetchError(state, [ 'relations', 'pageHasProductCategories', action.page ], action.error);

    // Videos
    // //////

    case actions.VIDEO_FETCH_START:
      return fetchStart(state, [ 'entities', 'videos', action.videoId ]);
    case actions.VIDEO_FETCH_SUCCESS: {
      const { entities: { scenes: sceneEntities }, result: video } = normalize(action.data, {
        scenes: arrayOf(sceneSchema)
      });

      // Strip the scene ids from the video.
      const scenesResult = video.scenes;
      Reflect.deleteProperty(video, 'scenes');

      return fetchSuccess(state, [ 'entities', 'videos', action.videoId ], action.data)
        .mergeIn([ 'entities', 'scenes' ], sceneEntities)
        .setIn([ 'relations', 'videoHasScenes', action.videoId ], List(scenesResult));
    }
    case actions.VIDEO_FETCH_ERROR:
      return fetchError(state, [ 'entities', 'videos', action.videoId ], action.error);

    case actions.VIDEO_PERSIST_SUCCESS:
      return fetchSuccess(state, [ 'entities', 'videos', action.id ], action.data);

    // Uninteresting actions
    // ---------------------

    default:
      return state;

  }
};
