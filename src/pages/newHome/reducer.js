import { Map, List, OrderedMap, fromJS } from 'immutable';
import * as actions from './actions';
import { FETCHING, ERROR, LOADED } from '../../data/statusTypes';

export default function newHomeReducer (state = Map({
  trendingTopics: Map(),
  topic: Map(),
  topicSpotts: Map({ data: OrderedMap() }),
  topicRelated: Map(),
  spotts: Map({ data: OrderedMap() }),
  spottsSubscribed: Map(),
  spottsPromoted: Map(),
  currentSpott: Map(),
  spottLovers: Map(),
  currentProduct: Map(),
  sidebarProducts: Map({ data: List() }),
  profile: Map({ subscriptions: Map() }),
  searchSuggestions: Map({
    isLoading: false,
    isSuccessful: false,
    error: null,
    items: List()
  }),
  searchResults: Map({
    topics: Map(),
    persons: Map(),
    posts: Map({ data: OrderedMap() })
  }),
  searchHistory: Map(),
  users: Map(),
  registrationFormDefaults: null,
  systemLanguages: Map(),
  systemCountries: Map(),
  systemContentRegions: Map(),
  systemCurrencies: Map()
}), action) {
  switch (action.type) {
    case actions.GET_TRENDING_TOPICS_START:
      return state.mergeIn([ 'trendingTopics' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TRENDING_TOPICS_SUCCESS:
      return state.set('trendingTopics', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TRENDING_TOPICS_ERROR:
      return state.mergeIn([ 'trendingTopics' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SPOTTS_START:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SPOTTS_SUCCESS:
      return state.mergeIn([ 'topicSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).setIn([ 'topicSpotts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_TOPIC_SPOTTS_ERROR:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SPOTTS_MORE_START:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SPOTTS_MORE_SUCCESS:
      return state.mergeIn([ 'topicSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'topicSpotts', 'data' ], fromJS(action.data.data));
    case actions.GET_TOPIC_SPOTTS_MORE_ERROR:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_RELATED_START:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_RELATED_SUCCESS:
      return state.set('topicRelated', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_RELATED_ERROR:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.SET_TOPIC_SUBSCRIBER_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.SET_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_LIST_START:
      return state.mergeIn([ 'spotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_LIST_SUCCESS:
      return state.mergeIn([ 'spotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'spotts', 'data' ], fromJS(action.data.data));
    case actions.GET_SPOTTS_LIST_ERROR:
      return state.mergeIn([ 'spotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_SUBSCRIBED_LIST_START:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS:
      return state.set('spottsSubscribed', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_ERROR:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_PROMOTED_LIST_START:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_PROMOTED_LIST_SUCCESS:
      return state.set('spottsPromoted', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTTS_PROMOTED_LIST_ERROR:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: action.error, _status: ERROR }));

    case actions.LOAD_SPOTT_START:
      return state.set('currentSpott', Map({ uuid: action.uuid }));
    case actions.LOAD_SPOTT_ERROR:
      return state.mergeIn([ 'currentSpott' ], Map({ _error: action.error }));

    case actions.LOAD_PRODUCT_START:
      return state.set('currentProduct', Map({ uuid: action.uuid }));
    case actions.LOAD_PRODUCT_ERROR:
      return state.mergeIn([ 'currentProduct' ], Map({ _error: action.error }));

    case actions.LOAD_SIDEBAR_PRODUCT_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => data.find((item) => item === action.uuid) ? data : data.push(action.uuid));
    case actions.LOAD_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.REMOVE_SIDEBAR_PRODUCT_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => data.filter((item) => item !== action.uuid));
    case actions.REMOVE_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.CLEAR_SIDEBAR_PRODUCTS_START:
      return state.updateIn([ 'sidebarProducts', 'data' ], (data) => List());
    case actions.CLEAR_SIDEBAR_PRODUCTS_ERROR:
      return state.mergeIn([ 'sidebarProducts' ], Map({ _error: action.error }));

    case actions.GET_USER_SUBSCRIPTIONS_START:
      return state.mergeIn([ 'profile', 'subscriptions' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_SUBSCRIPTIONS_SUCCESS:
      return state.setIn([ 'profile', 'subscriptions' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_SUBSCRIPTIONS_ERROR:
      return state.mergeIn([ 'profile', 'subscriptions' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SEARCH_SUGGESTIONS_CLEAR:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: false,
          items: [],
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_START:
      return state.merge({
        searchSuggestions: {
          isLoading: true,
          isSuccessful: false,
          items: [],
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_SUCCESS:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: true,
          items: action.data,
          error: null
        }
      });
    case actions.SEARCH_SUGGESTIONS_FETCH_ERROR:
      return state.merge({
        searchSuggestions: {
          isLoading: false,
          isSuccessful: false,
          items: [],
          error: action.error
        }
      });

    case actions.GET_SEARCH_TOPICS_START:
      return state.mergeIn([ 'searchResults', 'topics' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_TOPICS_SUCCESS:
      return state.setIn([ 'searchResults', 'topics' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SEARCH_TOPICS_ERROR:
      return state.mergeIn([ 'searchResults', 'topics' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SEARCH_POSTS_START:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_POSTS_SUCCESS:
      return state.mergeIn([ 'searchResults', 'posts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).setIn([ 'searchResults', 'posts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_SEARCH_POSTS_ERROR:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SEARCH_POSTS_MORE_START:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_POSTS_MORE_SUCCESS:
      return state.mergeIn([ 'searchResults', 'posts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'searchResults', 'posts', 'data' ], fromJS(action.data.data));
    case actions.GET_SEARCH_POSTS_MORE_ERROR:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SEARCH_PERSONS_START:
      return state.mergeIn([ 'searchResults', 'persons' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_PERSONS_SUCCESS:
      return state.setIn([ 'searchResults', 'persons' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SEARCH_PERSONS_ERROR:
      return state.mergeIn([ 'searchResults', 'persons' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SEARCH_HISTORY_START:
      return state.mergeIn([ 'searchHistory' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_HISTORY_SUCCESS:
      return state.setIn([ 'searchHistory' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SEARCH_HISTORY_ERROR:
      return state.mergeIn([ 'searchHistory' ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_SEARCH_HISTORY_START:
      return state.mergeIn([ 'searchHistory' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_SEARCH_HISTORY_SUCCESS:
      return state.setIn([ 'searchHistory' ], Map({ _error: null, _status: LOADED }));
    case actions.REMOVE_SEARCH_HISTORY_ERROR:
      return state.mergeIn([ 'searchHistory' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_PROFILE_START:
      return state.mergeIn([ 'users', action.uuid, 'profile' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_PROFILE_SUCCESS:
      return state.setIn([ 'users', action.uuid, 'profile' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_PROFILE_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'profile' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_LOVED_POSTS_START:
      return state.mergeIn([ 'users', action.uuid, 'lovedPosts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_LOVED_POSTS_SUCCESS:
      return state.mergeIn([ 'users', action.uuid, 'lovedPosts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'users', action.uuid, 'lovedPosts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_USER_LOVED_POSTS_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'lovedPosts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_WISHLIST_START:
      return state.mergeIn([ 'users', action.uuid, 'wishlist' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_WISHLIST_SUCCESS:
      return state.setIn([ 'users', action.uuid, 'wishlist' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_WISHLIST_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'wishlist' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_FOLLOWERS_START:
      return state.mergeIn([ 'users', action.uuid, 'followers' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_FOLLOWERS_SUCCESS:
      return state.setIn([ 'users', action.uuid, 'followers' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_FOLLOWERS_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'followers' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_FOLLOWING_START:
      return state.mergeIn([ 'users', action.uuid, 'following' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_FOLLOWING_SUCCESS:
      return state.setIn([ 'users', action.uuid, 'following' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_FOLLOWING_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'following' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_REGISTRATION_DEFAULTS:
      return state.set('registrationFormDefaults', Map({ ...action.data }));

    case actions.GET_COUNTRIES_START:
      return state.mergeIn([ 'systemCountries' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_COUNTRIES_SUCCESS:
      return state.setIn([ 'systemCountries' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_COUNTRIES_ERROR:
      return state.mergeIn([ 'systemCountries' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_LANGUAGES_START:
      return state.mergeIn([ 'systemLanguages' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_LANGUAGES_SUCCESS:
      return state.setIn([ 'systemLanguages' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_LANGUAGES_ERROR:
      return state.mergeIn([ 'systemLanguages' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_CONTENT_REGIONS_START:
      return state.mergeIn([ 'systemContentRegions' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_CONTENT_REGIONS_SUCCESS:
      return state.setIn([ 'systemContentRegions' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_CONTENT_REGIONS_ERROR:
      return state.mergeIn([ 'systemContentRegions' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_CURRENCIES_START:
      return state.mergeIn([ 'systemCurrencies' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_CURRENCIES_SUCCESS:
      return state.setIn([ 'systemCurrencies' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_CURRENCIES_ERROR:
      return state.mergeIn([ 'systemCurrencies' ], Map({ _error: action.error, _status: ERROR }));

    default:
      return state;
  }
}
