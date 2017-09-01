import { Map, List, OrderedMap, fromJS, Iterable } from 'immutable';
import * as actions from './actions';
import * as oldActions from './app/actions';
import { FETCHING, ERROR, LOADED } from '../data/statusTypes';

export default function newHomeReducer (state = Map({
  trendingTopics: Map(),
  trendingSeries: Map(),
  topic: Map(),
  topicSpotts: Map({ data: OrderedMap() }),
  topicRelated: Map(),
  topicSeasons: Map(),
  topicSeasonSpotts: Map(),
  topicSeasonEpisodes: Map(),
  topicSeasonEpisodeSpotts: Map(),
  spotts: Map({ data: OrderedMap() }),
  spottsSubscribed: Map({ data: OrderedMap() }),
  spottsPromoted: Map({ data: OrderedMap() }),
  spottsDetails: Map(),
  spottLovers: Map(),
  sidebarProducts: Map(),
  productsDetails: Map(),
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
  userActivityFeed: Map({ data: List() }),
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

    case actions.GET_TRENDING_SERIES_START:
      return state.mergeIn([ 'trendingSeries' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TRENDING_SERIES_SUCCESS:
      return state.set('trendingSeries', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TRENDING_SERIES_ERROR:
      return state.mergeIn([ 'trendingSeries' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING, data: Map() }));
    case actions.GET_TOPIC_SUCCESS:
      return state.set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SPOTTS_START:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: null, _status: FETCHING, data: List() })).set('topicSeasonEpisodes', Map());
    case actions.GET_TOPIC_SPOTTS_MORE_START:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_TOPIC_SPOTTS_SUCCESS:
      return state.mergeIn([ 'topicSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).setIn([ 'topicSpotts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_TOPIC_SPOTTS_MORE_SUCCESS:
      return state.mergeIn([ 'topicSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'topicSpotts', 'data' ], fromJS(action.data.data));
    case actions.GET_TOPIC_SPOTTS_ERROR:
      return state.mergeIn([ 'topicSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SEASONS_START:
      return state.mergeIn([ 'topicSeasons' ], Map({ _error: null, _status: FETCHING, data: List() })).set('topicSeasonEpisodes', Map());
    case actions.GET_TOPIC_SEASONS_SUCCESS:
      return state.set('topicSeasons', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_SEASONS_ERROR:
      return state.mergeIn([ 'topicSeasons' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SEASON_SPOTTS_START:
      return state.mergeIn([ 'topicSeasonSpotts' ], Map({ _error: null, _status: FETCHING, data: List() }));
    case actions.GET_TOPIC_SEASON_SPOTTS_SUCCESS:
      return state.mergeIn([ 'topicSeasonSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).setIn([ 'topicSeasonSpotts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_TOPIC_SEASON_SPOTTS_MORE_SUCCESS:
      return state.mergeIn([ 'topicSeasonSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'topicSeasonSpotts', 'data' ], fromJS(action.data.data));
    case actions.GET_TOPIC_SEASON_SPOTTS_ERROR:
      return state.mergeIn([ 'topicSeasonSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SEASON_EPISODES_START:
      return state.mergeIn([ 'topicSeasonEpisodes' ], Map({ _error: null, _status: FETCHING, data: List() }));
    case actions.GET_TOPIC_SEASON_EPISODES_SUCCESS:
      return state.set('topicSeasonEpisodes', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_SEASON_EPISODES_ERROR:
      return state.mergeIn([ 'topicSeasonEpisodes' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_SEASON_EPISODE_SPOTTS_START:
      return state.mergeIn([ 'topicSeasonEpisodeSpotts' ], Map({ _error: null, _status: FETCHING, data: List() }));
    case actions.GET_TOPIC_SEASON_EPISODE_SPOTTS_SUCCESS:
      return state.mergeIn([ 'topicSeasonEpisodeSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).setIn([ 'topicSeasonEpisodeSpotts', 'data' ], fromJS(action.data.data).toOrderedMap());
    case actions.GET_TOPIC_SEASON_EPISODE_SPOTTS_MORE_SUCCESS:
      return state.mergeIn([ 'topicSeasonEpisodeSpotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED })).mergeIn([ 'topicSeasonEpisodeSpotts', 'data' ], fromJS(action.data.data));
    case actions.GET_TOPIC_SEASON_EPISODE_SPOTTS_ERROR:
      return state.mergeIn([ 'topicSeasonEpisodeSpotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_TOPIC_RELATED_START:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: null, _status: FETCHING, data: List() }));
    case actions.GET_TOPIC_RELATED_SUCCESS:
      return state.set('topicRelated', fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_TOPIC_RELATED_ERROR:
      return state.mergeIn([ 'topicRelated' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.SET_TOPIC_SUBSCRIBER_SUCCESS:
      return state
        .set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }))
        .set('spotts', Map({ _error: null, _status: LOADED, data: OrderedMap() }))
        .set('spottsSubscribed', Map({ _error: null, _status: LOADED, data: OrderedMap() }));
    case actions.SET_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_TOPIC_SUBSCRIBER_START:
      return state.mergeIn([ 'topic' ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_SUCCESS:
      return state
        .set('topic', fromJS({ ...action.data, _error: null, _status: LOADED }))
        .set('spotts', Map({ _error: null, _status: LOADED, data: OrderedMap() }))
        .set('spottsSubscribed', Map({ _error: null, _status: LOADED, data: OrderedMap() }));
    case actions.REMOVE_TOPIC_SUBSCRIBER_ERROR:
      return state.mergeIn([ 'topic' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_LIST_START:
      return state.mergeIn([ 'spotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_LIST_SUCCESS:
      return state
        .mergeIn([ 'spotts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .mergeIn([ 'spotts', 'data' ], fromJS(action.data.data, (key, value) => {
          const isIndexed = Iterable.isIndexed(value);
          return isIndexed ? value.toList() : value.toOrderedMap();
        }))
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
    case actions.GET_SPOTTS_LIST_ERROR:
      return state.mergeIn([ 'spotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_SUBSCRIBED_LIST_START:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_SUCCESS:
      return state
        .mergeIn([ 'spottsSubscribed' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .mergeIn([ 'spottsSubscribed', 'data' ], fromJS(action.data.data, (key, value) => {
          const isIndexed = Iterable.isIndexed(value);
          return isIndexed ? value.toList() : value.toOrderedMap();
        }))
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
    case actions.GET_SPOTTS_SUBSCRIBED_LIST_ERROR:
      return state.mergeIn([ 'spottsSubscribed' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTTS_PROMOTED_LIST_START:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTTS_PROMOTED_LIST_SUCCESS:
      return state
        .mergeIn([ 'spottsPromoted' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .mergeIn([ 'spottsPromoted', 'data' ], fromJS(action.data.data, (key, value) => {
          const isIndexed = Iterable.isIndexed(value);
          return isIndexed ? value.toList() : value.toOrderedMap();
        }))
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
    case actions.GET_SPOTTS_PROMOTED_LIST_ERROR:
      return state.mergeIn([ 'spottsPromoted' ], Map({ _error: action.error, _status: ERROR }));

    case actions.CLEAR_SPOTTS_LIST:
      return state.set('spotts', Map({ _error: null, _status: LOADED, data: OrderedMap() }));
    case oldActions.LOGIN_SUCCESS:
      return state.set('spotts', Map({ _error: null, _status: LOADED, data: OrderedMap() }));
    case oldActions.LOGOUT_SUCCESS:
      return state
        .set('spotts', Map({ _error: null, _status: LOADED, data: OrderedMap() }))
        .set('spottsSubscribed', Map({ _error: null, _status: LOADED, data: OrderedMap() }))
        .set('userActivityFeed', Map({ _error: null, _status: LOADED, data: List() }));

    case actions.GET_SPOTT_START:
      return state.mergeIn([ 'spottsDetails', action.uuid ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_SUCCESS: {
      const relatedTopics = state.getIn([ 'spottsDetails', action.uuid, 'relatedTopics' ]) || Map();
      const similarSpotts = state.getIn([ 'spottsDetails', action.uuid, 'similar' ]) || Map();
      const spott = action.data;
      spott.relatedTopics = relatedTopics;
      spott.similar = similarSpotts;
      return state.setIn([ 'spottsDetails', action.uuid ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    }
    case actions.GET_SPOTT_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid ], action.error);

    case actions.GET_SPOTT_RELATED_TOPICS_START:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'relatedTopics' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_RELATED_TOPICS_SUCCESS:
      return state.setIn([ 'spottsDetails', action.uuid, 'relatedTopics' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTT_RELATED_TOPICS_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'relatedTopics' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTT_SIMILAR_START:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'similar' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_SIMILAR_SUCCESS:
      return state.setIn([ 'spottsDetails', action.uuid, 'similar' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTT_SIMILAR_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'similar' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SPOTT_LOVERS_START:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'lovers' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SPOTT_LOVERS_SUCCESS:
      return state.setIn([ 'spottsDetails', action.uuid, 'lovers' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_SPOTT_LOVERS_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid, 'lovers' ], Map({ _error: action.error, _status: ERROR }));

    case actions.SET_SPOTT_LOVER_START:
      return state.mergeIn([ 'spottsDetails', action.uuid ], Map({ _error: null, _status: FETCHING }));
    case actions.SET_SPOTT_LOVER_SUCCESS:
      return state.mergeIn([ 'spottsDetails', action.uuid ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.SET_SPOTT_LOVER_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid ], Map({ _error: action.error, _status: ERROR }));

    case actions.REMOVE_SPOTT_LOVER_START:
      return state.mergeIn([ 'spottsDetails', action.uuid ], Map({ _error: null, _status: FETCHING }));
    case actions.REMOVE_SPOTT_LOVER_SUCCESS:
      return state.mergeIn([ 'spottsDetails', action.uuid ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.REMOVE_SPOTT_LOVER_ERROR:
      return state.mergeIn([ 'spottsDetails', action.uuid ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_PRODUCT_START:
      return state.mergeIn([ 'productsDetails', action.uuid ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_PRODUCT_SUCCESS:
      return state.setIn([ 'productsDetails', action.uuid ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_PRODUCT_ERROR:
      return state.mergeIn([ 'productsDetails', action.uuid ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_PRODUCT_SIMILAR_START:
      return state.mergeIn([ 'productsDetails', action.uuid, 'similar' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_PRODUCT_SIMILAR_SUCCESS:
      return state.setIn([ 'productsDetails', action.uuid, 'similar' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_PRODUCT_SIMILAR_ERROR:
      return state.mergeIn([ 'productsDetails', action.uuid, 'similar' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_PRODUCT_SPOTTS_START:
      return state.mergeIn([ 'productsDetails', action.uuid, 'spotts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_PRODUCT_SPOTTS_SUCCESS:
      return state.setIn([ 'productsDetails', action.uuid, 'spotts' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_PRODUCT_SPOTTS_ERROR:
      return state.mergeIn([ 'productsDetails', action.uuid, 'spotts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.LOAD_SIDEBAR_PRODUCT_START: {
      let newState = state;
      if (!state.getIn([ 'sidebarProducts', action.spottUuid ])) {
        newState = state.setIn([ 'sidebarProducts', action.spottUuid ], Map({ data: List() }));
      }
      return newState.updateIn([ 'sidebarProducts', action.spottUuid, 'data' ], (data) => data.push(action.uuid));
    }
    case actions.LOAD_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts', action.spottUuid ], Map({ _error: action.error }));

    case actions.REMOVE_SIDEBAR_PRODUCT_START:
      return state.updateIn([ 'sidebarProducts', action.spottUuid, 'data' ], (data) => data.filter((item) => item !== action.uuid));
    case actions.REMOVE_SIDEBAR_PRODUCT_ERROR:
      return state.mergeIn([ 'sidebarProducts', action.spottUuid ], Map({ _error: action.error }));

    case actions.CLEAR_SIDEBAR_PRODUCTS_START:
      return state.updateIn([ 'sidebarProducts', action.spottUuid, 'data' ], (data) => List());
    case actions.CLEAR_SIDEBAR_PRODUCTS_ERROR:
      return state.mergeIn([ 'sidebarProducts', action.spottUuid ], Map({ _error: action.error }));

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
      return state
        .mergeIn([ 'searchResults', 'posts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .setIn([ 'searchResults', 'posts', 'data' ], fromJS(action.data.data).toOrderedMap())
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
    case actions.GET_SEARCH_POSTS_ERROR:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_SEARCH_POSTS_MORE_START:
      return state.mergeIn([ 'searchResults', 'posts' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_SEARCH_POSTS_MORE_SUCCESS:
      return state
        .mergeIn([ 'searchResults', 'posts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .mergeIn([ 'searchResults', 'posts', 'data' ], fromJS(action.data.data))
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
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
      return state
        .mergeIn([ 'users', action.uuid, 'lovedPosts' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .mergeIn([ 'users', action.uuid, 'lovedPosts', 'data' ], fromJS(action.data.data).toOrderedMap())
        .mergeDeepIn([ 'spottsDetails' ], fromJS(action.data.data));
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
      return state
        .mergeIn([ 'users', action.uuid, 'followers' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .setIn([ 'users', action.uuid, 'followers', 'data' ], fromJS(action.data.data));
    case actions.GET_USER_FOLLOWERS_MORE_SUCCESS:
      return state
        .mergeIn([ 'users', action.uuid, 'followers' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .updateIn([ 'users', action.uuid, 'followers', 'data' ], (data) => {
          const d = data ? data : List();
          return d.concat(fromJS(action.data.data));
        });
    case actions.GET_USER_FOLLOWERS_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'followers' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_FOLLOWING_START:
      return state.mergeIn([ 'users', action.uuid, 'following' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_FOLLOWING_SUCCESS:
      return state.setIn([ 'users', action.uuid, 'following' ], fromJS({ ...action.data, _error: null, _status: LOADED }));
    case actions.GET_USER_FOLLOWING_ERROR:
      return state.mergeIn([ 'users', action.uuid, 'following' ], Map({ _error: action.error, _status: ERROR }));

    case actions.GET_USER_ACTIVITY_FEED_START:
      return state.mergeIn([ 'userActivityFeed' ], Map({ _error: null, _status: FETCHING }));
    case actions.GET_USER_ACTIVITY_FEED_SUCCESS:
      return state
        .mergeIn([ 'userActivityFeed' ], fromJS({ ...action.data.meta, _error: null, _status: LOADED }))
        .updateIn([ 'userActivityFeed', 'data' ], (data) => data.concat(fromJS(action.data.data)));
    case actions.GET_USER_ACTIVITY_FEED_ERROR:
      return state.mergeIn([ 'userActivityFeed' ], Map({ _error: action.error, _status: ERROR }));
    case actions.RESET_USER_ACTIVITY_FEED_COUNTER_SUCCESS:
      return state
        .mergeIn([ 'userActivityFeed' ], fromJS({ newItemCount: 0 }));

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
